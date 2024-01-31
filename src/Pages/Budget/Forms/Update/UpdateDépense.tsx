import "../../Budget.css";
import "./Update.css";

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import { Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CustomButton } from "../../../../components/Buttons";

import { OperationType } from "../../../../../types";
import { categories } from "../../../../data";
import { deleteOperation, updateOperation } from "../../../../services";

type Category = {
  value: string;
  label: string;
}

const UpdateExpense = ({
  edit,
  setEdit,
  mariageID,
  setMessage,
  setMessageType,
  operations,
  setOperations,
  calculateTotal
}) => {
  const history: History = useHistory();
  const [input, setInput] = useState<OperationType>(edit ? edit : null);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    const float: number = parseFloat(value);
      const price: number = Math.round(float * 100);
      setInput((prevState) => ({
        ...prevState,
        [name]: price,
      }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value, name } = e.target;

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editExpense = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const { _id, description, price, category } = input;
    const updatedExpenses: OperationType[] = [...operations].map((obj) => {
      if (obj._id === _id) {
        obj.description = description;
        obj.price = price;
        obj.category = category;
      }
      return obj;
    });

    const response = await updateOperation({ id: _id, description: description, price: price, category: category })
    const { success, message } = response;

    if(!success) {
      setMessageType("error");
      setMessage(message);
      return;
    }

    if(message){
      setMessageType("success");
      setMessage(message);
    }

    setTimeout(() => {
      setOperations(updatedExpenses);
      calculateTotal(updatedExpenses);
      setEdit(null);
    }, 1000);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/budget`, { currentPosition })
    };

    const deleteExpense = async (id: string): Promise<void> => {
      const response = await deleteOperation({ id })
      const { success, message } =  response;
  
      if(!success) {
        setMessageType("error");
        setMessage(message);
        return;
      }

      if(message){
        setMessageType("success");
        setMessage(message);
      }
  
      const updatedExpenses: OperationType[] | [] = operations.filter(
        (operation: OperationType) => operation._id !== id
      );
      setOperations(updatedExpenses);
      calculateTotal(updatedExpenses);
      setEdit(null);
    };

  return (
    <div className="modal-child">
      <form onSubmit={editExpense}>
        <div className="budget___select">
          <select
            name="category"
            value={input.category}
            onChange={handleSelectChange}
          >
            {categories.map((category: Category) => (
              <option key={category.label} value={category.value} label={category.label}></option>
            ))}
          </select>
        </div>
        
        <TextField
          label="Description"
          size="small"
          type="text"
          name="description"
          onChange={handleTextChange}
          value={input.description}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />

        <TextField
          label="Prix"
          size="small"
          name="price"
          type="number"
          onChange={handlePriceChange}
          value={input.price as number / 100}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />

        <div className="action-buttons">
          <IconButton
            onClick={() => deleteExpense(edit._id)}
            style={{ backgroundColor: "darkred", borderRadius: "20px", flexGrow: 1 }}
          >
            <DeleteIcon style={{ color: "#F4F4F4" }} />
            <span style={{ color: "#F4F4F4", padding: "0px 6px" }}>Supprimer</span>
          </IconButton>

          <CustomButton
              text={"Enregistrer"}
              variant={"contained"}
              type="submit"
              sx={{ "&:hover": { backgroundColor: "#333232" } }}
              style={{ borderRadius: "20px", padding: "6px 16px", flexGrow: 1 }}
            />

            <Button
              style={{
                borderRadius: "20px",
                color: "grey",
                textTransform: "unset",
                fontSize: "1rem",
                width: "100%",
                borderColor: "#e4e8e8",
              }}
              onClick={() => {
                setEdit({
                  category: "",
                  price: "",
                  description: "",
                  date: "",
                  mariageID: ""
                });

                const currentPosition: number = window.scrollY;
                history.replace(`/mariage/${mariageID}/budget`, { currentPosition });
              }}
              variant="outlined"
            >
              Annuler
            </Button>
        </div>
      </form>
      
    </div>
  );
};

export default UpdateExpense;