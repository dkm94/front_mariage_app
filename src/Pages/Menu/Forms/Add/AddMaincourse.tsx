import "../../Menu.css";

import React, { useState, useRef, Dispatch, SetStateAction, RefObject, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { GreyButton } from "../../../../components/Buttons";
import { FoodType } from "../../../../../types";

interface AddMaincourseFormProps {
  maincourses: FoodType[];
  setMaincourses: Dispatch<SetStateAction<FoodType[]>>;
}

const AddMaincourseForm = (props: AddMaincourseFormProps) => {
  const { maincourses, setMaincourses } = props;

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
      .post(`/api/admin/menu/maincourses/add`, {
        name: input,
      })
      .then((res) => {
        const newMaincourse = res.data;
        setMaincourses([...maincourses, newMaincourse]);
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
          placeholder="Boeuf bourguignon..."
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
          height: "97%",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          borderRadius: "5px 20px 20px 5px",
        }}
      />
    </form>
  );
};

export default AddMaincourseForm;
