import React, { useState, useRef } from "react";
import axios from "axios";
import addIcon from "../../../img/add-group.png";
import "../Tables.css";
import GreyButton from "../../../components/Buttons/Grey/GreyButton";

const AddTableForm = ({ addTable }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/admin/tables/add", {
        name: input,
      })
      .then((res) => {
        addTable(res.data);
        setInput("");
        setLoading(false);
      })
      .catch((err) => console.log("err", err));
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
        style={{ marginLeft: "12px" }}
        text={loading ? "..." : "Ajouter"}
      />
    </form>
  );
};

export default AddTableForm;
