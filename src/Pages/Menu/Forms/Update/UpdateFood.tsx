import React, { useState, useRef, useEffect, Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router";

import { TextField } from "@mui/material";

import { deleteFood, updateFood } from "../../../../services";
import { useCurrentUser } from "../../../../ctx/userCtx";
import { FoodType } from "../../../../../types";
import { ClearButton, CustomButton } from "../../../../components/Buttons";
import { Food } from "../../Menu";

interface UpdateFoodProps {
    edit: any;
    setEdit: any;
    foods: FoodType[];
    setFoods: Dispatch<SetStateAction<FoodType[]>>;
    setMessage: Dispatch<SetStateAction<string | undefined>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
    setFoodId: Dispatch<SetStateAction<string | null>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateFood = (props: UpdateFoodProps) => {
  const { edit, setEdit, foods, setFoods, setMessage, setMessageType, setFoodId, setOpen } = props;

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
        return;
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

const deleteElement = async (id: string): Promise<void> => {
  setFoodId(id);
  
  const response = await deleteFood({ id });
  const { success, message, statusCode } = response;

  if(!success){
  setMessageType("error");
  setMessage(message);

  setTimeout(() => {
      setFoodId(null);
      setMessage(undefined);
      setMessageType(undefined);
  }, 2000);
  return;
  }

  if(success && statusCode === 200){
      setFoods(foods.filter((food: Food) => food._id !== id));

      setTimeout(() => {
          setFoodId(null);
          setMessage(undefined);
          setMessageType(undefined);
      }, 2000);
  }
  };

  const handleCancel = () => {
    setEdit({ id: "", name: "" })
    setInput("");
    setOpen(false);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
  }

  return (
    <div className="modal-child">
      <form id="update-food-form" onSubmit={handleSubmit}>
        <TextField
          label="Nom du plat/de la boisson"
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
        <div className="action-buttons">
          <CustomButton 
          text="Supprimer"
          variant="outlined"
          onClick={() => deleteElement(edit?.id)}
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
}

export default UpdateFood;