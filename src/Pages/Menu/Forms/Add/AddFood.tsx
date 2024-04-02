import "../../Menu.css";

import React, { useState, useRef, RefObject, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";

import { GreyButton } from "../../../../components/Buttons";

import { FoodType } from "../../../../../types";
import { addFood } from "../../../../services/foodRequests";
import { ApiResponse } from "../../../../helpers/requestHandler";
import { TextField } from "@mui/material";
import { SelectFood } from "./SelectFood";

type Category = "starter" | "maincourse" | "dessert" | "apetizer" | "beverage";

interface AddFoodsFormProps {
  foods: FoodType[];
  setFoods: Dispatch<SetStateAction<FoodType[]>>;
  category: Category | string;
  setCategoryName: Dispatch<SetStateAction<Category | string>>;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  handleModal: () => void;
}

// const placeholders: string[] = [
//   "Petits fours...",
//   "Entrées...",
//   "Plats principaux...",
//   "Desserts...",
//   "Boissons..."
// ];

const AddFoodForm = (props: AddFoodsFormProps) => {
  const { foods, setFoods, category, setMessage, setMessageType, setCategoryName, handleModal } = props;

  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    const response:ApiResponse<FoodType> = await addFood({ name: input, category });
    const { data: newFood, success, message } = response;

    if(!success){
      setLoading(false);
      setMessageType("error");
      setMessage(message);
      return;
    }

    setFoods([...foods, newFood]);
    setInput("");
    handleModal();
    setLoading(false);
  };

  return (
    <>
      <form
        id="food-form"
        onSubmit={handleSumbit}
      >
        <TextField
          label="Plat/boisson"
          size="small"
          fullWidth
          type="text"
          name="name"
          value={input}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Petits fours..."
          required
        />
        <SelectFood selectedFood={category} setCategoryName={setCategoryName} />
        <GreyButton
          variant="contained"
          size="small"
          type="submit"
          text={loading ? "..." : "Ajouter"}
          style={{
            marginLeft: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            height: "97%", 
            borderRadius: "5px 5px"
          }}
        />
      </form>
    </>
  );
};

export default AddFoodForm;
