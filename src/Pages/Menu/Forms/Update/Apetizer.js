import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, styled } from "@mui/material";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

const UpdateApetizer = ({ edit, setEdit, editApetizer }) => {
  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    } else {
      await axios
        .post(`/api/admin/menu/apetizers/edit/${edit.id}`, { name: input })
        .then((res) => {
          editApetizer(res.data);
          setEdit("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit({ id: "" });
    setInput("");
  };

  return (
    <Grid2
      lg={12}
      component={"form"}
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"row"}
    >
      <Grid2
        component={"input"}
        xs={8}
        width={"100% !important"}
        type="text"
        name="name"
        onChange={handleChange}
        value={input}
        ref={inputRef}
        pl={2}
        pr={3}
        className="add-input"
        textAlign={"unset"}
      />
      <Grid2 xs={4}>
        <IconWrapper
          onClick={(e) => {
            editApetizer(e);
          }}
          type="submit"
        >
          <CheckIcon />
        </IconWrapper>
        <IconWrapper onClick={() => setEdit({ id: null })}>
          <ReplayIcon />
        </IconWrapper>
      </Grid2>
    </Grid2>
  );
};

export default UpdateApetizer;
