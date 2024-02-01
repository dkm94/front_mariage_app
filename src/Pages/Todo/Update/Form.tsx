import "./Form.css";

import React, { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useEffect, useRef } from "react";
import { useHistory } from 'react-router';

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";

import { updateTodo } from "../../../services";
import { TaskType } from "../../../../types";

import CustomIconButton from '../../../components/Buttons/SmallIconButton/IconButton';

type EditType = {
  id?: string;
  text?: string;
}

interface UpdateTaskFormProps {
  edit: EditType | null;
  input: string;
  setEdit: Dispatch<SetStateAction<EditType | null>>;
  setInput: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<TaskType[]>>;
  todos: TaskType[];
  setMessage:Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  mariageID: string;
}

const UpdateTask = (props: UpdateTaskFormProps) => {
  const { 
    edit, 
    input, 
    setEdit, 
    setInput, 
    setTodos, 
    todos, 
    setMessage, 
    setMessageType, 
    mariageID } = props;

  const history = useHistory();
  const inputRef:RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const editTodo = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const response = await updateTodo({ text: input, id: edit?.id })
    const { success, message } = response;
    
    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    const todosCopy = [...todos]
    const selectedTodo = todosCopy.find((t) => t._id === edit?.id);
    if(selectedTodo){
      selectedTodo.text = input;
    }
    setTimeout(() => {
      setTodos([...todosCopy]);
      setEdit(null);
      setInput("");
    }, 1000);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
  };

  const handleCancel = () => {
    setEdit(null);
    setInput("");

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
  }

  return (
    <Grid2
      container
      display={"flex"}
      flexDirection={"row"}
      p={"1rem 3rem"}
      width={"100%"}
    >
      <form onSubmit={editTodo} id="todo-form">
        <Grid2 width={"100%"}>
          <TextField
            size="small"
            style={{
              width: "100%",
              backgroundColor: "#fff",
            }}
            type="text"
            name="text"
            onChange={handleChange}
            value={input}
            ref={inputRef}
          />
        </Grid2>

        <Grid2 display={"flex"} gap={"7px"}>
          <CustomIconButton type="submit" buttonType="save"/>
          <CustomIconButton
          type="reset" 
          buttonType="cancel" 
          onClick={handleCancel}
          />
        </Grid2>
      </form>
    </Grid2>
  );
};

export default UpdateTask;
