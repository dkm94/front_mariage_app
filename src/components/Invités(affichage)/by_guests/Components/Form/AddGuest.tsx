import React, { useState, useRef } from "react";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "../../../../../Pages/Invités/Invités.css";
import { GreyButton } from "../../../../Buttons";

const AddGuestForm = ({ addGuest }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/admin/guests/add", {
        name: input,
      })
      .then((res) => {
        addGuest(res.data);
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
        {/* <img src={userIcon} alt="user icon" /> */}
        <PersonAddIcon style={{ height: "auto", color: "#b2a9a9" }} />
        <input
          type="text"
          className="form-control shadow-none"
          name="name"
          placeholder="Nouvel invité"
          value={input}
          onChange={handleChange}
          ref={inputRef}
          required
        />
      </div>
      <GreyButton
        size="small"
        variant={"contained"}
        type="submit"
        text={loading ? "..." : "Créer"}
        style={{ marginLeft: "1rem" }}
      />
    </form>
  );
};

export default AddGuestForm;
