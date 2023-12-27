import "../../guests.css";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";

import { BlackButton } from "../../../../Buttons";

import checkIcon from "../../../../../img/green-check.png";

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
  const [family, setFamily] = useState({
    firstPerson: "",
    secondPerson: "",
  });
  const [radioValue, setRadioValue] = useState(guestFamily);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/admin/wedding/${mariageID}`, { withCredentials: true })
        .then((res) => {
          setFamily({
            firstPerson: res.data.firstPerson,
            secondPerson: res.data.secondPerson,
          });
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [mariageID]);

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
      <div className="nameField guest__updateForm" id="input___nameField">
        <div
          style={{
            marginBottom: "2rem",
            paddingRight: "1rem",
            paddingBottom: "1rem",
          }}
        >
        </div>
        <form onSubmit={handleSubmit} id="update-form">
          <Grid padding={"5px 30px"}>
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
          <Grid container mt={4} padding={"5px 30px"}>
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

          <div className="chose-family" style={{ padding: "5px 30px" }}>
            <div className="fam-input-container">
              <input
                type="radio"
                id="test1"
                name="family"
                value="1"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "1"}
              />
              <label htmlFor="test1" className="choose-fam-label">Famille de {family.firstPerson}</label>
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
              <label htmlFor="test2" className="choose-fam-label">Famille de {family.secondPerson} </label>
            </div>
          </div>
          <div className="guest-card__form__button-container">
            <IconButton
              style={{ backgroundColor: "darkred", borderRadius: "5px", padding: "6px 16px" }}
              onClick={() => deleteGuest(edit.id)}
            >
              {/* <DeleteIcon style={{ color: "#F4F4F4" }} /> */}
              <span style={{ color: "#F4F4F4" }}>Supprimer</span>
            </IconButton>
            <div className="guest-modal-action-right">
              <Button
                id="cancel-button"
                onClick={() => {
                  setEdit({ id: null });
                  setisOpen(false);
                }}
                variant="outlined"
                style={{
                  color: "grey",
                  textTransform: "unset",
                  fontSize: "1rem",
                }}
              >
                Annuler
              </Button>
              <BlackButton
                text={"Valider"}
                type={"submit"}
                variant="contained"
                style={{ borderRadius: "5px", padding: "6px 16px" }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
