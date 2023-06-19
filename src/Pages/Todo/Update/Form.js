import React, { useEffect } from "react";
import "./Form.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";

const UpdateTask = ({
  edit,
  input,
  handleChange,
  inputRef,
  editTodo,
  setEdit,
}) => {
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleValue = (content) => {
    handleChange(content);
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
        <Grid2 xs={10} display={"flex"} alignItems={"center"}>
          {edit && (
            <>
              <input
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid lightgrey",
                }}
                type="text"
                name="text"
                onChange={handleValue}
                value={input.text}
                ref={inputRef}
              />
            </>
          )}
        </Grid2>
        <Grid2 xs={2} display={"flex"} justifyContent={"flex-start"}>
          <IconButton type="submit">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => setEdit({ id: null })}>
            <ReplayIcon />
          </IconButton>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default UpdateTask;
