import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import BlackButton from "../../../../Buttons/Black/BlackButton";
import checkIcon from "../../../../../img/green-check.png";
import TextField from "@mui/material/TextField";
import "../../guests.css";

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
  guest,
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
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      id: edit.id,
      name: input,
    });
    console.log(guestId);
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
          <h1
            style={{
              textAlign: "start",
              fontSize: "1.5rem",
              paddingLeft: "30px",
            }}
          >
            Modifier l'invité
          </h1>
        </div>
        <form onSubmit={handleSubmit} id="update-form">
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
          <Grid container mt={4}>
            <Grid item xs={12}>
              <TextField
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
            <p>
              <input
                type="radio"
                id="test1"
                name="family"
                value="1"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "1"}
              />
              <label htmlFor="test1">Famille de {family.firstPerson}</label>
            </p>
            <p>
              <input
                type="radio"
                id="test2"
                name="family"
                value="2"
                onChange={(e) => setRadioValue(e.target.value)}
                checked={radioValue === "2"}
              />
              <label htmlFor="test2">Famille de {family.secondPerson} </label>
            </p>
          </div>
          <div className="guest-card__form__button-container">
            <Button
              onClick={() => {
                setEdit({ id: null });
                setisOpen(false);
              }}
              variant="outline"
              style={{ color: "grey" }}
            >
              Annuler
            </Button>
            <BlackButton
              text={"Valider"}
              // onClick={handleSubmit}
              type={"submit"}
              variant="contained"
              style={{ borderRadius: "5px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateGuest;
