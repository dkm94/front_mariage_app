import "./style.css";

import React, { useState, useRef, HTMLAttributes, ChangeEvent, Dispatch, SetStateAction } from "react";

import { addTable } from "../../../../services";

import { ClearButton, CustomButton } from "../../../../components/Buttons";
import { TextField } from "@mui/material";

interface AddTableProps extends HTMLAttributes<HTMLFormElement> {
  tables: any;
  setTables: any;
  setMessage: any;
  setMessageType: any;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  mariageID: string;
  history: any;
}

const AddTableForm = (props: AddTableProps) => {
  const { 
    tables, 
    setTables, 
    setMessage, 
    setMessageType, 
    setOpenModal,
    mariageID,
    history
   } = props;
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setOpenModal(false);
  };

  const handleCancel = () => {
    setInput("");
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/tables`, { currentPosition })
    setOpenModal(false);
  }

  return (
    <form
    id="add-table-form"
    onSubmit={handleSumbit}
    >
      <TextField
        type="text"
        size="small"
        className="form-control shadow-none"
        name="name"
        placeholder="Nom/Numéro de la table"
        value={input}
        onChange={handleChange}
        ref={inputRef}
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

export default AddTableForm;
