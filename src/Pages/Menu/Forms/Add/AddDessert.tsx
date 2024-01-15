import "../../Menu.css";

import React, { useState, useRef } from "react";
import axios from "axios";

import { GreyButton } from "../../../../components/Buttons";

const AddDessertForm = ({ desserts, setDesserts }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.get("/api/admin/menu");
    await axios
      .post(`/api/admin/menu/desserts/add`, {
        name: input,
      })
      .then((res) => {
        const newDessert = res.data;
        setDesserts([...desserts, newDessert]);
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
          placeholder="Sorbet aux fruits..."
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
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          height: "fit-content",
          borderRadius: "5px 20px 20px 5px",
        }}
      />
    </form>
  );
};

export default AddDessertForm;
