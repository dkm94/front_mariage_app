import "../Tables.css";

import React, { useState, useRef } from "react";

import { GreyButton } from "../../../components/Buttons";
import addIcon from "../../../img/add-group.png";
import { addTable } from "../../../services";

const AddTableForm = ({ tables, setTables, setMessage, setMessageType }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await addTable({ name: input });
    const { data, success, message } = response;

    if (!success) {
      setMessage(message);
      setMessageType("error");
      return;
    }
    
    setLoading(false);
    setInput("");
    setLoading(false);
    const newTable = data;
    setTables([...tables, newTable]);
  };

  return (
    <form
      onSubmit={handleSumbit}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div className="add-input">
        <img src={addIcon} alt="add table icon" />
        <input
          type="text"
          className="form-control shadow-none"
          name="name"
          placeholder="Nom/Numéro de la table"
          value={input}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <GreyButton
        size="small"
        variant="contained"
        type="submit"
        style={{ marginLeft: "12px", height: "97%", borderRadius: "5px 20px 20px 5px" }}
        text={loading ? "..." : "Ajouter"}
      />
    </form>
  );
};

export default AddTableForm;
