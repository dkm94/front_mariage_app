import "../../Budget.css";
import "./Update.css";

import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { BlackButton } from "../../../../components/Buttons";

const UpdateExpense = ({
  edit,
  setEdit,
  onSubmit,
  deleteExpense,
}) => {

  const [input, setInput] = useState(edit ? edit : null);

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
    setInput(null);
    setEdit(null)
  };




  return (
    <div className="modal-child">
      <form onSubmit={handleSubmit}>
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

        <div className="action-buttons">
          <IconButton
            onClick={() => deleteExpense(edit._id)}
            style={{ backgroundColor: "darkred", borderRadius: "5px", flexGrow: 1 }}
          >
            <DeleteIcon style={{ color: "#F4F4F4" }} />
            <span style={{ color: "#F4F4F4", padding: "0px 6px" }}>Supprimer</span>
          </IconButton>

          <BlackButton
              text={"Valider"}
              variant={"contained"}
              onClick={handleSubmit}
              style={{ borderRadius: "5px", padding: "6px 16px", flexGrow: 1 }}
            />

            <Button
              style={{
                color: "grey",
                textTransform: "unset",
                fontSize: "1rem",
                width: "100%",
                borderColor: "#e4e8e8",
              }}
              onClick={() => {
                setEdit({
                  category: "",
                  price: "",
                  description: "",
                  date: "",
                  mariageID: ""
                });
              }}
              variant="outlined"
            >
              Annuler
            </Button>
        </div>
      </form>
      
    </div>
  );
};

export default UpdateExpense;