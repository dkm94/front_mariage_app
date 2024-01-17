import "./Form.css";

import React, { useEffect, useRef } from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";

import CustomIconButton from '../../../components/Buttons/SmallIconButton/IconButton';

const UpdateTask = ({
  edit,
  input,
  editTodo,
  setEdit,
  setInput,
  setisOpen,
  todo,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
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
            value={input.text}
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
          }}
          />
        </Grid2>

      </form>
    </Grid2>
  );
};

export default UpdateTask;
