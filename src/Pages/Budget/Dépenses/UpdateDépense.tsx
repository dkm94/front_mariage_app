import "../Budget.css";

import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, IconButton } from "@mui/material";

import { BlackButton } from "../../../components/Buttons";

const UpdateExpense = ({
  edit,
  setEdit,
  onSubmit,
  deleteExpense,
  setisOpen,
}) => {
  const [input, setInput] = useState(edit ? edit : "");

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "price") {
      const float = parseFloat(value);
      const price = Math.round(float * 100);
      setInput((prevState) => ({
        ...prevState,
        [name]: price,
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




  return (
    <div className="events-list___inputs">
      <div
        style={{
          marginBottom: "2rem",
          paddingRight: "1rem",
          paddingBottom: "1rem",
        }}
      >
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "5rem",
          padding: "5px 30px",
        }}
      >
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
            <option value="Alliances/Bijoux" label="Alliances/Bijoux"></option>
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
          label="Description"
          size="small"
          type="text"
          name="description"
          onChange={handleChange}
          value={input.description}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />

        <TextField
          label="Prix"
          size="small"
          name="price"
          type="number"
          onChange={handleChange}
          value={input.price / 100}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />
      </form>
      <div className="expense__edit-form">
        {/* <Button
          onClick={() => deleteExpense(edit._id)}
          color="error"
          variant="contained"
          style={{ textTransform: "unset" }}
        >
          Supprimer
        </Button> */}
        <IconButton
          style={{
            backgroundColor: "darkred",
            borderRadius: "5px",
            fontSize: "unset",
          }}
          onClick={() => deleteExpense(edit._id)}
        >
          {/* <DeleteIcon style={{ color: "#F4F4F4" }} /> */}
          <span style={{ color: "#F4F4F4", padding: "0px 6px" }}>Supprimer</span>
        </IconButton>
        <div className="exp-modal-action-right">
          <Button
            className="exp-modal-action-right__cancel"
            style={{
              background: "none",
              color: "grey",
              textTransform: "unset",
              fontSize: "1rem",
              border: "1px solid darkgrey"
            }}
            onClick={() => {
              setEdit({
                id: null,
                name: ""
              });
              setisOpen(false);
            }}
            variant="outlined"
          >
            Annuler
          </Button>
          <BlackButton
            text={"Valider"}
            variant={"contained"}
            onClick={handleSubmit}
            style={{ borderRadius: "5px", padding: "6px 16px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateExpense;
