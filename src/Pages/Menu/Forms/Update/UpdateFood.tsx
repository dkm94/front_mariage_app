import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, TextField, styled } from "@mui/material";

import { updateFood } from "../../../../services";
import { useCurrentUser } from "../../../../ctx/userCtx";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

interface UpdateFoodProps {
    edit: any;
    setEdit: any;
    foods: any;
    setFoods: any;
    setMessage: Dispatch<SetStateAction<string | undefined>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
}

const enableStyle = {
    backgroundColor: "#262626",
    border: "1px solid lightgray",
    borderRadius: "5px",
    color: "#fff",
}

const disableStyle = {
    backgroundColor: "#ccc9c9",
    border: "1px solid lightgray",
    borderRadius: "5px",
    color: "#fff",
}

const UpdateFood = (props: UpdateFoodProps) => {
  const { edit, setEdit, foods, setFoods, setMessage, setMessageType } = props;

  const history = useHistory();
  const{ mariageID } = useCurrentUser();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [input, setInput] = useState(edit ? edit.name : "");
  const inputRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(input === ""){
        setMessageType("error");
        setMessage("Le champ doit être rempli");
    }
 
    input.trim();

    const response = await updateFood({ id: edit.id, name: input });
    
    const { message, success, statusCode } = response;

    if(!success){
        setMessageType("error");
        setMessage(message);
        return;
    }

    if(success && statusCode === 200){
        const foodsCopy = [...foods];
        const selectedFood = foodsCopy.find((food) => food._id === edit.id);
        if (selectedFood) {
            selectedFood.name = input;
            setTimeout(() => {
            setFoods(foodsCopy);
            setEdit({ id: "", name: "" });
            setInput("");
            }, 500);
        setEdit({ id: "", name: "" });
        setInput("");
        setMessageType("success");
        setMessage(message);
      }

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
  };
}

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
        required
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
          style={isDisabled ? disableStyle : enableStyle}
          disabled={isDisabled}
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
          onClick={() => {
            setEdit({ id: "", name: "" })
            setInput("");

            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
          }}
        >
          <ReplayIcon fontSize="small" />
        </IconWrapper>
      </Grid2>
    </Grid2>
  );
}

export default UpdateFood;