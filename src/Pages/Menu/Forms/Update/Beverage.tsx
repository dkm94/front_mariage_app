import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, TextField, styled } from "@mui/material";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

const UpdateBeverage = ({ edit, setEdit, beverages, setBeverages }) => {
  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
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
        .post(`/api/admin/menu/beverages/edit/${edit.id}`, { name: input })
        .then((res) => {
          if (res.status === 200) {
            const beveragesCopy = [...beverages];
            const selectedBeverage = beveragesCopy.find((beverage) => beverage._id === edit.id);
            if (selectedBeverage) {
              selectedBeverage.name = input;
              setTimeout(() => {
                setBeverages(beveragesCopy);
                setEdit({ id: "", name: "" });
                setInput("");
              }, 500);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit({ id: "", name: "" });
    setInput("");
  };

  return (
    <Grid2
      lg={12}
      component={"form"}
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"row"}
      gap={"23px"}
    >
      <TextField
        size="small"
        type="text"
        name="name"
        onChange={handleChange}
        value={input}
        ref={inputRef}
        fullWidth
        style={{ backgroundColor: "#fff" }}
      />
      <Grid2
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"end"}
        width={"fit-content"}
        xs={4}
        gap={"7px"}
      >
        <IconWrapper
          type="submit"
          style={{
            backgroundColor: "#262626",
            border: "1px solid lightgray",
            borderRadius: "5px",
            color: "#fff",
          }}
        >
          <CheckIcon fontSize="small" />
        </IconWrapper>
        <IconWrapper
          style={{
            backgroundColor: "#fff",
            border: "1px solid lightgray",
            borderRadius: "5px",
            color: "#262626",
          }}
          onClick={() => setEdit({ id: null })}
        >
          <ReplayIcon fontSize="small" />
        </IconWrapper>
      </Grid2>
    </Grid2>
  );
};

export default UpdateBeverage;
