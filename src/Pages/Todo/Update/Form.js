import React, { useEffect, useRef } from "react";
import "./Form.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, TextField } from "@mui/material";

const UpdateTask = ({
  edit,
  input,
  editTodo,
  setEdit,
  setInput,
  setisOpen,
  todo,
}) => {
  console.log("🚀 ~ file: Form.js:17 ~ input:", input);
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
          <IconButton
            type="submit"
            style={{
              backgroundColor: "#262626",
              border: "1px solid lightgray",
              borderRadius: "5px",
              color: "#fff",
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setEdit(null);
              setInput("");
            }}
            style={{
              backgroundColor: "#fff",
              border: "1px solid lightgray",
              borderRadius: "5px",
              color: "#262626",
            }}
          >
            <ReplayIcon />
          </IconButton>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default UpdateTask;
