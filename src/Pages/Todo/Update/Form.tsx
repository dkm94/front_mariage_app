import "./Form.css";

import React, { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router';

import { TextField } from "@mui/material";

import { deleteTodo, updateTodo } from "../../../services";
import { TaskType } from "../../../../types";

import { ClearButton, CustomButton } from "../../../components/Buttons";

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
  setTodo: Dispatch<SetStateAction<string | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
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
    mariageID,
    setTodo,
    setOpen, 
    handleCancel
  } = props;

  const history = useHistory();
  const inputRef:RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  
  useEffect(() => {
    inputRef?.current?.focus();
  });

  useEffect(() => {
    if(input === ""){
        setIsDisabled(true);
    } else {
        setIsDisabled(false);
    }
  }, [input])


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

  const deleteTodoFn = async (id: string): Promise<void> => {
    setTodo(id);

    const response = await deleteTodo({ id })
    const { success, message } = response;

    if(!success) {
      setMessageType("error");
      setMessage(message);

      setTimeout(() => {
        setMessage(undefined);
        setMessageType(undefined);
        setTodo(null);
      }, 2000);
      return;
    }

    setMessageType("success");
    setMessage(message);
    setTodos(todos.filter((todo: TaskType) => todo._id !== id));

    setTimeout(() => {
      setMessage(undefined);
      setMessageType(undefined);
      setTodo(null);
    }, 2000);
  };

  return (
    <div className="modal-child">
      <form onSubmit={editTodo} id="todo-form">
          <TextField
            label="Tâche"
            required
            size="small"
            type="text"
            name="text"
            onChange={handleChange}
            value={input}
            ref={inputRef}
            fullWidth
            style={{ backgroundColor: "#fff" }}
          />
        <div className="action-buttons">
            <CustomButton 
            text="Supprimer"
            variant="outlined"
            onClick={() => deleteTodoFn(edit?.id ?? '')}
            type="button"
            backgroundColor="none"
            width="48%" 
            borderRadius="5px"
            color="error"
            border={"1px solid #f44336"}
            />

          <CustomButton
            text="Enregistrer"
            type="submit"
            variant="contained" 
            width="48%"
            disabled={isDisabled}
            borderRadius="5px"
          />

          <ClearButton
            text={"Annuler"}     
            onClick={handleCancel}
            />
          
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
