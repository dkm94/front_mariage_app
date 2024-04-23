import "../../Budget.css";
import "./Update.css";

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent, SetStateAction, Dispatch } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import { TextField } from "@mui/material";

import { ClearButton, CustomButton } from "../../../../components/Buttons";

import { OperationType } from "../../../../../types";
import { categories } from "../../../../data";
import { deleteOperation, updateOperation } from "../../../../services";

type Category = {
  value: string;
  label: string;
}

interface UpdateExpenseProps {
    edit: OperationType | null;
    setEdit: (value: OperationType | null) => void;
    mariageID: string;
    setMessage: Dispatch<SetStateAction<string | undefined>>;
    setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
    operations: OperationType[];
    setOperations: Dispatch<SetStateAction<OperationType[]>>;
    calculateTotal: (operations: OperationType[]) => void;
    setOperationId: Dispatch<SetStateAction<string | null>>;
    setIsDisabled?: Dispatch<SetStateAction<boolean>>;
}

const UpdateExpense = (props: UpdateExpenseProps) => {
  const { 
    edit, 
    setEdit, 
    mariageID, 
    setMessage, 
    setMessageType, 
    operations, 
    setOperations, 
    calculateTotal, 
    setOperationId,
    setIsDisabled } = props;
    
  const history: History = useHistory();
  const [input, setInput] = useState<OperationType | null>(edit ? edit : null);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    const float: number = parseFloat(value);
    const price: number = Math.round(float * 100);
  
    setInput((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: price,
        };
      }
      return prevState;
    });
  };
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
  
    setInput((prevState) => {
      if (prevState && name in prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };
  
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value, name } = e.target;
  
    setInput((prevState) => {
      if (prevState && name in prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };
  

  const editExpense = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    
    setOperationId(input?._id as string);
    setIsDisabled && setIsDisabled(true);

    const { _id, description, price, category } = input as OperationType;
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
      
      setTimeout(() => {
        setOperationId(null);
        setMessageType(undefined);
        setMessage(undefined);
        setIsDisabled && setIsDisabled(false); 
      }, 2000)
      return;
    }

    if(message){
      setMessageType("success");
      setMessage(message);
    }

    setOperations(updatedExpenses);
    calculateTotal(updatedExpenses);
    setEdit(null);

    setTimeout(() => {
      setOperationId(null);
      setMessageType(undefined);
      setMessage(undefined);
      setIsDisabled && setIsDisabled(false); 
    }, 2000);

    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/budget`, { currentPosition })
    };

    const deleteExpense = async (id: string): Promise<void> => {
      setOperationId(id);
      setIsDisabled && setIsDisabled(true);

      const response = await deleteOperation({ id })
      const { success, message } =  response;
  
      if(!success) {
        setMessageType("error");
        setMessage(message);

        setTimeout(() => {
          setOperationId(null);
          setMessageType(undefined);
          setMessage(undefined); 
          setIsDisabled && setIsDisabled(false); 
        }, 2000)
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

      setTimeout(() => {
        setOperationId(null);
        setMessageType(undefined);
        setMessage(undefined);
        setIsDisabled && setIsDisabled(false); 
        }, 2000);
    };

    const handleCancel = () => {
      setEdit({
        category: "",
        price: "",
        description: "",
        date: "",
        mariageID: ""
      });

      const currentPosition: number = window.scrollY;
      history.replace(`/mariage/${mariageID}/budget`, { currentPosition });
    }

  return (
    <div className="modal-child">
      <form onSubmit={editExpense}>
        <div className="budget___select">
          <select
            name="category"
            value={input?.category}
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
          value={input?.description}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />

        <TextField
          label="Prix"
          size="small"
          name="price"
          type="number"
          onChange={handlePriceChange}
          value={input?.price as number / 100}
          ref={inputRef}
          style={{ background: "#fff", width: "100%" }}
        />

        <div className="action-buttons">
          <CustomButton 
          text="Supprimer"
          variant="outlined"
          onClick={() => deleteExpense(edit?._id as string)}
          type="button"
          backgroundColor="none"
          width="48%" 
          borderRadius="5px"
          color="error"
          border={"1px solid #f44336"}
          fontWeight={900}
          />

          <CustomButton
          text="Enregistrer"
          type="submit"
          variant="contained" 
          width="48%"
          borderRadius="5px"
          />

          <ClearButton
            text="Annuler"
            onClick={handleCancel}
          />
        </div>
      </form>
      
    </div>
  );
};

export default UpdateExpense;