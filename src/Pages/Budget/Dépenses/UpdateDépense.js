import { Button, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import BlackButton from "../../../components/Buttons/Black/BlackButton";

const UpdateExpense = ({ edit, setEdit, onSubmit, deleteExpense }) => {
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

  return (
    <div className="events-list___inputs">
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
          Gérer la dépense
        </h1>
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
          value={input.price}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />
      </form>
      <div className="expense__edit-form">
        <Button
          onClick={() => deleteExpense(edit._id)}
          color="error"
          variant="contained"
          style={{ textTransform: "unset" }}
        >
          Supprimer
        </Button>
        <div>
          <Button
            style={{
              background: "none",
              color: "grey",
              textTransform: "unset",
              fontSize: "1rem",
            }}
            onClick={() => setEdit({ id: null })}
            variant="outline"
          >
            Annuler
          </Button>
          <BlackButton
            text={"Valider"}
            variant={"contained"}
            onClick={handleSubmit}
            style={{ borderRadius: "5px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateExpense;
