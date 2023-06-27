import { Button, IconButton, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import BlackButton from "../../../components/Buttons/Black/BlackButton";
import CloseIcon from "@mui/icons-material/Close";

const UpdateExpense = ({ edit, setEdit, onSubmit }) => {
  const [input, setInput] = useState(edit ? edit : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "price") {
      setInput((prevState) => ({
        ...prevState,
        [name]: parseFloat(value),
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: edit.id,
      expense: input,
    });
    setInput({
      description: "",
      price: "",
    });
  };

  console.log(setEdit);

  return (
    <div className="events-list___inputs">
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </div>
      <form onSubmit={handleSubmit} className="expense-update-form">
        {edit ? (
          <>
            <div className="budget___select">
              <select
                name="category"
                value={input.category}
                onChange={handleChange}
              >
                <option value="" label="Sélectionnez une catégorie"></option>
                <option value="Locations" label="Locations"></option>
                <option
                  value="Habillement/Beauté"
                  label="Habillement/Beauté"
                ></option>
                <option
                  value="Décoration/Fleurs"
                  label="Décoration/Fleurs"
                ></option>
                <option
                  value="Alliances/Bijoux"
                  label="Alliances/Bijoux"
                ></option>
                <option
                  value="Animation"
                  label="Animation (DJ, Photographe...)"
                ></option>
                <option value="Traiteur" label="Traiteur"></option>
                <option value="Faire-part" label="Faire-part"></option>
                <option value="Autres" label="Autres"></option>
              </select>
            </div>
            <TextField
              size="small"
              type="text"
              name="description"
              onChange={handleChange}
              value={input.description}
              ref={inputRef}
              style={{ background: "#fff" }}
            />

            <TextField
              size="small"
              name="price"
              type="number"
              onChange={handleChange}
              value={input.price}
              ref={inputRef}
              style={{ background: "#fff" }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
                marginBottom: "0.5rem",
                gap: "7px",
              }}
            >
              <BlackButton
                text={"Valider"}
                variant={"contained"}
                onClick={handleSubmit}
              />
              <Button
                style={{
                  background: "none",
                  color: "#000",
                  textTransform: "unset",
                  fontSize: "1rem",
                }}
                onClick={() => setEdit({ id: null })}
              >
                Annuler
              </Button>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default UpdateExpense;
