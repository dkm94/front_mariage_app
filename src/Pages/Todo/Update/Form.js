import "./Form.css";

import React, { useEffect, useRef } from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";

import { updateTodo } from "../../../services"

import CustomIconButton from '../../../components/Buttons/SmallIconButton/IconButton';
import { useHistory } from 'react-router';

const UpdateTask = ({
  edit,
  input,
  // editTodo,
  setEdit,
  setInput,
  setisOpen,
  todo,
  setTodos,
  todos,
  setMessage,
  setMessageType,
  mariageID
}) => {
  const history = useHistory();
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const editTodo = async (e) => {
    e.preventDefault();

    const response = await updateTodo({ text: input, id: edit.id })
    const { success, message } = response;
    
    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    const todosCopy = [...todos]
    const selectedTodo = todosCopy.find((t) => t._id === edit.id);
    if(selectedTodo){
      selectedTodo.text = input;
    }
    setTimeout(() => {
      setTodos([...todosCopy]);
      setEdit("");
      setInput("");
    }, 1000);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
  };

  return (
    <Grid2
      container
      display={"flex"}
      flexDirection={"row"}
      p={"1rem 3rem"}
      width={"100%"}
    >
      <form onSubmit={editTodo} className="todo-form">

        <Grid2 width={"100%"}>
          <TextField
            size="small"
            style={{
              width: "100%",
              backgroundColor: "#fff",
            }}
            type="text"
            name="text"
            onChange={(e) => handleChange(e)}
            value={input}
            ref={inputRef}
          />
        </Grid2>

        <Grid2 display={"flex"} gap={"7px"}>
          <CustomIconButton type="submit" buttonType="save"/>
          <CustomIconButton
          type="reset" 
          buttonType="cancel" 
          onClick={() => {
            setEdit(null);
            setInput("");

            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/taches`, { currentPosition })
          }}
          />
        </Grid2>

      </form>
    </Grid2>
  );
};

export default UpdateTask;
