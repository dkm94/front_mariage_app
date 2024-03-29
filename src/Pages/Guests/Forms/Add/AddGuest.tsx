import "../../Guests.css";

import React, { useState, useRef, Dispatch, SetStateAction, FormEvent, ChangeEvent } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { GreyButton } from "../../../../components/Buttons";

import { GuestType } from "../../../../../types";
import { addGuest } from "../../../../services";
import { ApiResponse } from "../../../../helpers/requestHandler";

interface FormProps {
  newUser: string;
  setNewUser: Dispatch<SetStateAction<string>>;
  guests: GuestType[];
  setGuests: Dispatch<SetStateAction<GuestType[]>>;
  setMessage:Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
}

const AddGuestForm = (props:FormProps) => {
  const { newUser, setNewUser, setMessage, setMessageType, guests, setGuests } = props;
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewUser(e.target.value);
  };

  const handleSumbit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    newUser.trim();

    const response:ApiResponse<GuestType> = await addGuest({ name: newUser })
    const { data, success, message } = response;

    if(!success){
      setLoading(false);
      setMessageType("error");
      setMessage(message);
      return;
    }

    const guestsCopy = [...guests];
    setGuests([...guestsCopy, data]);
    setNewUser("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSumbit}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div className="add-input">
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
        variant={"contained"}
        type="submit"
        text={loading ? "..." : "Créer"}
        style={{ marginLeft: "1rem", height: "97%", borderRadius: "5px 20px 20px 5px" }}
      />
    </form>
  );
};

export default AddGuestForm;
