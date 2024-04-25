import "./Form.css";

import React, { useState, useRef, HTMLAttributes, SetStateAction, Dispatch, ChangeEvent } from "react";

import { TextField } from "@mui/material";

import { TaskType } from "../../../../types";
import { addTodo } from "../../../services";

import { ClearButton, CustomButton } from "../../../components/Buttons";

interface AddTodoFormProps extends HTMLAttributes<HTMLFormElement> {
  todos: any[];
  setTodos: Dispatch<SetStateAction<TaskType[]>>;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<string | undefined>>;
  mariageID: string;
  history: any;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AddTodoForm = (props: AddTodoFormProps) => {
  const { todos, 
    setTodos, 
    setMessage, 
    setMessageType, 
    mariageID, 
    history, 
    setOpenModal 
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

    const response = await addTodo({ text: input });
    const { success, message, data: newTodo } = response;
    if (!success) {
      setMessageType("error");
      setMessage(message);
      setLoading(false);
      return;
    }

    setTodos([...todos, newTodo]);
    setInput("");
    setLoading(false);
    setOpenModal(false);
  };

  const handleCancel = () => {
    setInput("");
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
    setOpenModal(false);
  }

  return (
    <form id="add-task-form" onSubmit={handleSumbit}>
      <TextField
        label="Tâche"
        type="text"
        name="text"
        value={input}
        onChange={handleChange}
        className="form-control shadow-none"
        placeholder="Appeler le traiteur"
        ref={inputRef}
        fullWidth
        size="small"
        required
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

export default AddTodoForm;
