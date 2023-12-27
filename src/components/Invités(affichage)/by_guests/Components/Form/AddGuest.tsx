import React, { useState, useRef } from "react";
import axios from "axios";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import "../../../../../Pages/Invités/Invités.css";
import { GreyButton } from "../../../../Buttons";

const AddGuestForm = ({ newUser, setNewUser, addGuest }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setNewUser(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/admin/guests/add", {
        name: newUser,
      })
      .then((res) => {
        addGuest(res.data);
        setNewUser("");
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
          value={newUser}
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
