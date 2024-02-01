import React, { useState, useRef, useEffect, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TextField } from "@mui/material";

import CustomIconButton from "../../../../components/Buttons/SmallIconButton/IconButton";

import { updateFood } from "../../../../services";
import { useCurrentUser } from "../../../../ctx/userCtx";
import { FoodType } from "../../../../../types";

interface UpdateFoodProps {
    edit: any;
    setEdit: any;
    foods: FoodType[];
    setFoods: Dispatch<SetStateAction<FoodType[]>>;
    setMessage: Dispatch<SetStateAction<string | undefined>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
    setFoodId: Dispatch<SetStateAction<string | null>>;
}

const UpdateFood = (props: UpdateFoodProps) => {
  const { edit, setEdit, foods, setFoods, setMessage, setMessageType, setFoodId } = props;

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setFoodId(edit.id);

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

        setTimeout(() => {
          setMessage(undefined);
          setMessageType(undefined);
          setFoodId(null);
        }, 2000);
        return;
    }

    if(success && statusCode === 200){
        const foodsCopy = [...foods];
        const selectedFood = foodsCopy.find((food) => food?._id === edit.id);
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

      setTimeout(() => {
        setMessage(undefined);
        setMessageType(undefined);
        setFoodId(null);
      }, 2000);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
  };
}

  const handleCancel = () => {
    setEdit({ id: "", name: "" })
    setInput("");
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
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
        <CustomIconButton 
        type="submit"
        buttonType="save"
        disabled={isDisabled}
        />

        <CustomIconButton 
        type="button"
        buttonType='cancel'
        onClick={handleCancel}
        />
      </Grid2>
    </Grid2>
  );
}

export default UpdateFood;