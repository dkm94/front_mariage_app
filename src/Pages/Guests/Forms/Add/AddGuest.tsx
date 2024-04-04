import "./style.css";

import React, { useState, useRef, Dispatch, SetStateAction, FormEvent, ChangeEvent } from "react";

import { TextField } from "@mui/material";

import { addGuest } from "../../../../services";
import { ApiResponse } from "../../../../helpers/requestHandler";
import { GuestType } from "../../../../../types";

import { ClearButton, CustomButton } from "../../../../components/Buttons";
import { SingleSelect } from "../../../../components";

interface FormProps {
  newUser: string;
  setNewUser: Dispatch<SetStateAction<string>>;
  guests: GuestType[];
  setGuests: Dispatch<SetStateAction<GuestType[]>>;
  setMessage:Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  mariageID: string;
  history: any;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  firstPerson: string;
  secondPerson: string;
}

const AddGuestForm = (props:FormProps) => { // TODO: add check name length
  const { 
    newUser, 
    setNewUser, 
    setMessage, 
    setMessageType, 
    guests, 
    setGuests, 
    setOpenModal,
    history, 
    mariageID,
    selectedValue,
    setSelectedValue,
    firstPerson,
    secondPerson
  } = props;

  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const selectArray=[
    {
      value: "1",
      name: firstPerson
    },
    {
      value: "2",
      name: secondPerson
    }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewUser(e.target.value);
  };

  const handleSumbit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    newUser.trim();

    const response:ApiResponse<GuestType> = await addGuest({ name: newUser, family: selectedValue })
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
    setSelectedValue("");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setNewUser("");
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/invites`, { currentPosition })
    setOpenModal(false);
  }

  return (
    <form
      id="add-guest-form"
      onSubmit={handleSumbit}
    >
      <TextField
        label="Nom.."
        size="small"
        type="text"
        fullWidth
        className="form-control shadow-none"
        name="name"
        placeholder="Nouvel invité"
        value={newUser}
        onChange={handleChange}
        ref={inputRef}
        required
      />
      <SingleSelect
        selected={selectedValue}
        setSelected={setSelectedValue} 
        placeholder={"Famille"} 
        array={selectArray} 
        label={"Sélectionner la famille"}
      />
      <CustomButton
          variant="contained"
          type="submit"
          text={loading ? "..." : "Valider"}
          borderRadius="5px"
          width="100%"
        />
      <ClearButton
          text={"Annuler"}     
          onClick={handleCancel}
      />
    </form>
  );
};

export default AddGuestForm;
