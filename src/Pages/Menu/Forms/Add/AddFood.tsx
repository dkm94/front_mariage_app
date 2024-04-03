import "../../Menu.css";

import React, { useState, useRef, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import { TextField } from "@mui/material";

import { ClearButton, CustomButton, GreyButton } from "../../../../components/Buttons";
import { Category, FoodType } from "../../../../../types";
import { addFood } from "../../../../services/foodRequests";
import { ApiResponse } from "../../../../helpers/requestHandler";
import { SelectFood } from "./SelectFood";

interface AddFoodsFormProps {
  foods: FoodType[];
  setFoods: Dispatch<SetStateAction<FoodType[]>>;
  selectedCategory: Category | string;
  setSelectedCategory: Dispatch<SetStateAction<Category | string>>;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  handleModal: () => void;
  mariageID: string;
  setOpenModal: (boolean) => void;
}

// const placeholders: string[] = [
//   "Petits fours...",
//   "Entrées...",
//   "Plats principaux...",
//   "Desserts...",
//   "Boissons..."
// ];

const AddFoodForm = (props: AddFoodsFormProps) => {
  const { 
    foods, 
    setFoods, 
    selectedCategory, 
    setMessage, 
    setMessageType, 
    setSelectedCategory, 
    handleModal, 
    mariageID,
    setOpenModal
  } = props;

  const history: History = useHistory();

  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    const response:ApiResponse<FoodType> = await addFood({ name: input, category: selectedCategory });
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
    setSelectedCategory("starter");
    setLoading(false);
  };

  const handleCancel = () => {
    setInput("");
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/carte`, { currentPosition })
    setOpenModal(false);
  }

  // TODO: handle url change onClick add new food
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
        <SelectFood selectedFood={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <CustomButton
          variant="contained"
          type="submit"
          text={loading ? "..." : "Valider"}
          borderRadius="5px"
          width="100%"
        />
        <ClearButton
            text={"Annuler"}     
            onClick={handleCancel}
        />
          
      </form>
    </>
  );
};

export default AddFoodForm;
