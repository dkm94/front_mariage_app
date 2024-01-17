import "../../Menu.css";

import React, { useState, useRef, Dispatch, SetStateAction, RefObject, ChangeEvent, FormEvent } from "react";

import axios from "axios";

import { GreyButton } from "../../../../components/Buttons";
import { FoodType } from "../../../../../types";

interface AddBeverageFormProps {
  beverages: FoodType[];
  setBeverages: Dispatch<SetStateAction<FoodType[]>>;
}

const AddBeverageForm = (props: AddBeverageFormProps) => {
  const { beverages, setBeverages } = props;

  const [input, setInput] = useState<string>("");
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`/api/admin/menu/beverages/add`, {
        name: input,
      })
      .then((res) => {
        const newBeverage = res.data;
        setBeverages([...beverages, newBeverage]);
        setInput("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSumbit}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      className="mt-4"
    >
      <div className="add-input">
        <input
          type="text"
          name="name"
          value={input}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Champagne..."
          required
        />
      </div>
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
          borderRadius: "5px 20px 20px 5px"
        }}
      />
    </form>
  );
};

export default AddBeverageForm;
