import "../../Menu.css";

import React, { useState, useRef, RefObject, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";

import { GreyButton } from "../../../../components/Buttons";

import { FoodType } from "../../../../../types";
import { addFood } from "../../../../services/foodRequests";
import Toast from "../../../../components/Toast/Toast";

type Category = "starter" | "maincourse" | "dessert" | "apetizer" | "beverage";

interface AddFoodsFormProps {
  foods: FoodType[];
  setFoods: Dispatch<SetStateAction<FoodType[]>>;
  category: Category;
}

const AddFoodForm = (props: AddFoodsFormProps) => {
  const { foods, setFoods, category } = props;

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [input, setInput] = useState<string>("");
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await addFood({ name: input, category });
    const { data, success, message } = response;

    if(!success){
      setLoading(false);
      setMessageType("error");
      setMessage(message);
      return;
    }

    setFoods([...foods, data]);
    setInput("");
    setLoading(false);
  };

  return (
    <>
      <Toast message={message} messageType={messageType} />
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
    </>
  );
};

export default AddFoodForm;