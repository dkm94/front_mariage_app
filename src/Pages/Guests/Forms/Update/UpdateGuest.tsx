import "../../style/guests.css";
import "./Update.css";

import React, { useState, useRef, useEffect, FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";
import { History } from "history";
import axios from "axios";

import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

import { ClearButton, CustomButton } from "../../../../components/Buttons";

import { deleteGuest, updateGuest } from "../../../../services";
import { GuestType, UserType } from "../../../../../types";
import { useCurrentUser } from "../../../../ctx/userCtx";

import checkIcon from "../../../../img/green-check.png";

type FileState = File | null;

type Edit = {
  id: string;
  name: string;
}

interface UpdateGuestProps {
  guests: GuestType[];
  setGuests: Dispatch<SetStateAction<GuestType[]>>;
  edit: Edit | null;
  setEdit: Dispatch<SetStateAction<Edit | null>>;
  mariageID: string;
  guestFamily: string | undefined;
  uploadImg: string;
  seteditPicture: Dispatch<SetStateAction<string>>;
  guestId: string | undefined;
  setMessage:Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  setGuestId: Dispatch<SetStateAction<string | null>>;
}

const UpdateGuest = (props: UpdateGuestProps) => {
  const { 
    edit, 
    guests, 
    setGuests, 
    setEdit, 
    mariageID, 
    guestFamily, 
    uploadImg, 
    seteditPicture, 
    guestId, 
    setMessage, 
    setMessageType, 
    setGuestId } = props;

  const history: History = useHistory();

  const [radioValue, setRadioValue] = useState<string>(guestFamily || "");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const user:UserType = useCurrentUser();
  const { firstPerson, secondPerson } = user as { firstPerson: string, secondPerson: string };

  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef<HTMLDivElement>(null);

  const [uploadedFile, setUploadedFile] = useState<FileState>(null);
  const [file, setFile] = useState<FileState>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleFile = (file: FileState): void => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const uploadPicture = async (id: string): Promise<void> => {
    if (file == null) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("media", file);
      const { data } = await axios.post(`/api/guests/edit/${id}`, formData);
      // const response = await updateGuestMedia({ id: id, formData });

      if(data){
        setEdit(null);
        setInput("");

        const updatedGuestList: GuestType[] = [...guests].map((guest: GuestType) =>
        guest?._id === id
        ? {
          _id: data.data._id,
          name: data.data.name,
          family: data.data.family,
          media: data.data.media,
        }
        : guest
        );
        
        setFile(null);
        setGuests(updatedGuestList);
      }
    } catch (error) {
      setMessageType("error");
      setMessage("La photo n'a pas été chargée");
    }
  };
  

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if(edit){
      setGuestId(edit.id);

    if(input === ""){
      setMessageType("error");
      setMessage("Veuillez entrer un nom");
      return;
    }

    input.trim();

    const response = await updateGuest({ id: edit?.id, name: input, family: radioValue });
    const { message, statusCode } = response;

    if(statusCode !== 200){
      setMessageType("error");
      setMessage(message);

      setTimeout(() => {
        setGuestId(null);
        setMessageType(undefined);
        setMessage(undefined);
      }, 2000);
      return;
    }

    if(statusCode === 200 && message){
      setMessageType("success");
      setMessage(message);
    }

    setEdit(null);
    setInput("");

    uploadPicture(edit.id)
    
    const updatedGuestlist: GuestType[] = [...guests].map((guest) => {
      if (guest?._id === edit.id) {
        if (guest) {
          guest.name = input;
          guest.family = radioValue;
        }
      }
      return guest;
    });

    setGuests(updatedGuestlist);
    
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition });

    setTimeout(() => {
      setMessageType(undefined);
      setMessage(undefined);
      setGuestId(null);
    }, 2000);
    }
  };

  const deleteGuestfn = async (id: string): Promise<void> => {
    try{
      setGuestId(id);
      const response = await deleteGuest({ id });
      const { success, message } = response;

      if(success){
        setMessageType("success");
        setMessage(message);
        setGuests(guests.filter((guest: GuestType) => guest?._id !== id));

        setTimeout(() => {
          setGuestId(null);
          setMessageType(undefined);
          setMessage(undefined);
        }, 2000);

        const currentPosition: number = window.scrollY;
        history.replace(`/mariage/${mariageID}/invites`, { currentPosition });
      }
    } catch (e) {
      setTimeout(() => {
        setGuestId(null);
        setMessageType("error");
        setMessage("Oups, une erreur est survenue lors de la suppression de l'invité");
      }, 2000);
    }
  };

  const handleCancel = (): void => {
    setEdit(null);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition });
  }

  return (
    <>
      <div className="modal-child">
        <form onSubmit={handleSubmit}>
          <Grid>
            <div id="upload-avatar">
              {uploadedFile ? (
                <img alt="icone vérification" src={checkIcon} />
              ) : (
                <label htmlFor="file-input">
                  <img alt="telecharger avatar" src={uploadImg}/>
                  <span>Télécharger une photo</span>
                </label>
              )}
              <input
                id="file-input"
                type="file"
                name="media"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileInput(e, setUploadedFile)}
                style={{ display: "none" }}
                onClick={() => seteditPicture(guestId || "")}
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
              <CustomButton 
              text="Supprimer"
              variant="outlined"
              onClick={() => edit && deleteGuestfn(edit.id)}
              type="button"
              backgroundColor="none"
              width="48%" 
              borderRadius="5px"
              color="error"
              border={true}
              fontWeight={900}
              />

              <CustomButton
              text="Enregistrer"
              type="submit"
              variant="contained" 
              width="48%"
              disabled={isDisabled}
              borderRadius="5px"
              />

              <ClearButton
              text={"Annuler"}     
              onClick={handleCancel}
              />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
