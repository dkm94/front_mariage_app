import "../../../guests.css";
import "./Update.css";

import React, { useState, useRef, useEffect, useContext, FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import { History } from "history";
import axios from "axios";
import { Button, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import { ClearButton, CustomButton } from "../../../../../Buttons";

import checkIcon from "../../../../../../img/green-check.png";
import { useFetch } from "../../../../../../hooks";
import { deleteGuest, getWedding, updateGuest, updateGuestMedia } from "../../../../../../services";
import { GuestType, UserType, WeddingType } from "../../../../../../../types";
// import { UserContext } from "../../../../../../App";
import RedButton from "../../../../../Buttons/RedButton/RedButton";
import { useCurrentUser } from "../../../../../../ctx/userCtx";
import { useHistory, useLocation } from "react-router";

type FileState = File | null;

const UpdateGuest = ({
  edit,
  guests,
  setGuests,
  setEdit,
  mariageID,
  guestFamily,
  uploadImg,
  // handleFileInput,
  seteditPicture,
  guestId,
  // upload,
  // uploadedFile,
  setisOpen,
  setMessage,
  setMessageType,
  setIsOpen,
  setUser, 
}) => {
  const history: History = useHistory();

  const [radioValue, setRadioValue] = useState<string>(guestFamily);

  const user:UserType = useCurrentUser();
  const { firstPerson, secondPerson } = user as { firstPerson: string, secondPerson: string };

  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef<HTMLDivElement>(null);

  const [uploadedFile, setUploadedFile] = useState<FileState>(null);
  const [file, setFile] = useState<FileState>(null);


  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleFile = (file: FileState) => {
    setFile(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>, setUploadedFile: Dispatch<SetStateAction<FileState>>) => {
    const fileValue: File | null = e.target.files?.[0] || null;
  
    if (fileValue) {
      setUploadedFile(fileValue);
      handleFile(fileValue);
    } else {
      setUploadedFile(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const uploadPicture = async (id: string): Promise<void> => {
    if (file == null) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("media", file);
      const { data, status } = await axios.post(`/api/admin/guests/edit/${id}`, formData);
      // const response = await updateGuestMedia({ id: id, formData });
      // const { message, statusCode, data } = response;

      setEdit({ id: "" });
      setInput("");

      const updatedGuestList: GuestType[] = [...guests].map((guest: GuestType) =>
        guest?._id === id
          ? {
              _id: data._id,
              name: data.name,
              family: data.family,
              media: data.media,
            }
          : guest
      );
      
      setFile(null);
      setUser({
        _id: data._id,
        name: data.name,
        family: data.family,
        media: data.media,
      });
      setGuests(updatedGuestList);
    } catch (error) {
      setMessageType("error");
      setMessage("La photo n'a pas été chargée");
    }
  };
  

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if(input === ""){
      setMessageType("error");
      setMessage("Veuillez entrer un nom");
      return;
    }

    input.trim();

    const response = await updateGuest({ id: edit.id, name: input, family: radioValue });
    const { message, statusCode } = response;

    if(statusCode !== 200){
      setMessageType("error");
      setMessage(message);
      return;
    }
    setEdit({ id: "" });
    setInput("");

    uploadPicture(edit.id)
    
    const updatedGuestlist: GuestType[] = [...guests].map((guest: GuestType) => {
      if (guest?._id === edit.id) {
        if (guest) {
          guest.name = input;
          guest.family = radioValue;
        }
      }
      return guest;
    });

    setGuests(updatedGuestlist);
    setTimeout(() => {
      setMessageType(undefined);
      setMessage(undefined);
    })

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition });
  };

  const deleteGuestfn = async (id: string): Promise<void> => {
    const response = await deleteGuest({ id });
    const { success, message } = response;

    // if(!success){
    //   setMessageType("error");
    //   setMessage(message);
    //   return;
    // }
    if(success){
      // setMessageType("success");
      // setMessage(message);
      setGuests(guests.filter((guest: GuestType) => guest?._id !== id));
      setisOpen(false);
    }

  };

  return (
    <>
      <div className="modal-child">
        <form onSubmit={handleSubmit}>
          <Grid>
            <div id="upload-avatar">
              {uploadedFile ? (
                <img
                  alt="icone vérification"
                  src={checkIcon}
                  style={{ height: "4rem", width: "fit-content" }}
                />
              ) : (
                <label
                  htmlFor="file-input"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt="telecharger avatar"
                    src={uploadImg}
                    style={{ height: "4rem", width: "fit-content" }}
                  />
                  <span>Télécharger une photo</span>
                </label>
              )}
              <input
                id="file-input"
                type="file"
                name="media"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileInput(e, setUploadedFile)}
                style={{ display: "none" }}
                onClick={() => seteditPicture(guestId)}
              />
            </div>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Nom"
                type="text"
                name="name"
                onChange={handleChange}
                value={input}
                ref={inputRef}
                style={{ width: "100%" }}
                required
              />
            </Grid>
          </Grid>

          <div className="chose-family">
            <div className="fam-input-container">
              <input
                type="radio"
                id="test1"
                name="family"
                value="1"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "1"}
              />
              <label htmlFor="test1" className="choose-fam-label">Famille de {firstPerson}</label>
            </div>
            <div className="fam-input-container">
              <input
                type="radio"
                id="test2"
                name="family"
                value="2"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "2"}
              />
              <label htmlFor="test2" className="choose-fam-label">Famille de {secondPerson}</label>
            </div>
          </div>
          <div className="action-buttons">
            
            <RedButton 
            type="button"
            text="Supprimer"
            handleClick={() => deleteGuestfn(edit.id)}
            />

            <CustomButton
              text={"Enregistrer"}
              type={"submit"}
              variant="contained"
              sx={{ flexGrow: 1 }}
            />

            <ClearButton
              text={"Annuler"}
              type={"button"}
              onClick={() => {
                setEdit({ id: null });
                setisOpen(false);
                const currentPosition: number = window.scrollY;
                history.replace(`/mariage/${mariageID}/invites`, { currentPosition });
              }}
              variant="outlined"
              style={{
                width: "100% !important",
              }}
              sx={{ width: "100% !important" }}
              />
              
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
