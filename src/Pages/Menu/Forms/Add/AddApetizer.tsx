import "../../Menu.css";

import React, { useState, useRef, RefObject, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";
import axios from "axios";

import { GreyButton } from "../../../../components/Buttons";

import { FoodType } from "../../../../../types";

interface AddApetizerFormProps {
  apetizers: FoodType[];
  setApetizers: Dispatch<SetStateAction<FoodType[]>>;
}

const AddApetizerForm = (props: AddApetizerFormProps) => {
  const { apetizers, setApetizers } = props;

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
      .post(`/api/admin/menu/apetizers/add`, {
        name: input,
      })
      .then((res) => {
        const newApetizer = res.data;
        setApetizers([...apetizers, newApetizer]);
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
      className="mt-4"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div className="add-input">
        <input
          type="text"
          name="name"
          value={input}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Petits fours..."
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

export default AddApetizerForm;
