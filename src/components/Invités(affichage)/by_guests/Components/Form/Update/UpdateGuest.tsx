import "../../../guests.css";
import "./Update.css";

import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import { BlackButton } from "../../../../../Buttons";

import checkIcon from "../../../../../../img/green-check.png";
import { useFetch } from "../../../../../../hooks";
import { getWedding } from "../../../../../../services";
import { UserType, WeddingType } from "../../../../../../../types";
import { UserContext } from "../../../../../../App";

const UpdateGuest = ({
  edit,
  setEdit,
  onSubmit,
  mariageID,
  guestFamily,
  uploadImg,
  handleFileInput,
  seteditPicture,
  guestId,
  upload,
  uploadedFile,
  setisOpen,
  deleteGuest,
}) => {
  const [radioValue, setRadioValue] = useState(guestFamily);

  const user: UserType = useContext(UserContext);
  const { firstPerson, secondPerson } = user as { firstPerson: string, secondPerson: string };

  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      _id: edit.id,
      name: input,
    });
    if (input.trim() === "") {
      return;
    } else {
      await axios
        .post(`api/admin/guests/edit/${edit.id}`, {
          _id: edit.id,
          name: input,
          family: radioValue,
        })
        .then((res) => {
          upload(edit.id);
          onSubmit(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit({ id: "" });
    setInput("");
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
                onChange={handleFileInput}
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
            <IconButton
              onClick={() => deleteGuest(edit.id)}
              style={{ backgroundColor: "darkred", borderRadius: "5px", flexGrow: 1 }}
            >
              <DeleteIcon style={{ color: "#F4F4F4" }} />
              <span style={{ color: "#F4F4F4" }}>Supprimer</span>
            </IconButton>

            <BlackButton
              text={"Valider"}
              type={"submit"}
              variant="contained"
              style={{ borderRadius: "5px", padding: "6px 16px", flexGrow: 1 }}
            />

            <Button
              onClick={() => {
                setEdit({ id: null });
                setisOpen(false);
              }}
              variant="outlined"
              style={{
                color: "grey",
                textTransform: "unset",
                fontSize: "1rem",
                width: "100%",
                borderColor: "#e4e8e8",
              }}
            >
              Annuler
            </Button>
              
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
