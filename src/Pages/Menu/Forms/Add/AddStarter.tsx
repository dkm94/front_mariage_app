import "../../Menu.css";

import React, { useState, useRef } from "react";
import axios from "axios";

import GreyButton from "../../../../components/Buttons/Grey/GreyButton.tsx";

const AddStarterForm = ({ addStarter, icon }) => {
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
      .post(`/api/admin/menu/starters/add`, {
        name: input,
      })
      .then((res) => {
        addStarter(res.data);
        setInput("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSumbit}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      className="mt-4"
    >
      <div className="add-input">
        <input
          type="text"
          name="name"
          value={input}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Verrine d'avocat et saumon fumé..."
          required
        />
      </div>
      <GreyButton
        variant="contained"
        size="small"
        type="submit"
        text={loading ? "..." : "Ajouter"}
        style={{
          marginLeft: "1rem",
          height: "fit-content",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      />
    </form>
  );
};

export default AddStarterForm;
