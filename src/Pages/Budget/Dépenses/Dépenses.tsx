import "./Dépenses.css";

import React, { Dispatch, SetStateAction } from "react";

import ExpenseElement from "../../../components/Expenses/Table/ExpenseElement/ExpenseElement";

import { headerItems } from '../../../data';
import { OperationType } from "../../../../types";

interface ExpensesProps {
  expenses: OperationType[];
  searchValue: string;
  edit: OperationType | null;
  setEdit: (operation: OperationType | null) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  setOperations: Dispatch<SetStateAction<OperationType[]>>;
  calculateTotal: (operations: OperationType[]) => void;
}

const Expenses = (props: ExpensesProps) => {
  const { expenses, searchValue, edit, setEdit, setMessage, setMessageType, setOperations, calculateTotal } = props;

  return (
    <ul className="budget-list">
      <li className="table-header">
        {headerItems.map((item, index) => {
          return (
            <div key={index} className={`cols cols-${index + 1}`}>
              {item}
            </div>
          );
        })}
      </li>
      {expenses?.length === 0 && <div style={{ textAlign: "center"}}><span>Vos dépenses ici</span></div>}
      {expenses
        ?.filter((expense) => {
          return (
            expense.description
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) >= 0
          );
        })
        ?.reverse()
        ?.map((obj) => {
          return (
            <ExpenseElement 
            obj={obj} 
            edit={edit} 
            setEdit={setEdit} 
            setMessage={setMessage}
            setMessageType={setMessageType}
            operations={expenses}
            setOperations={setOperations}
            calculateTotal={calculateTotal}
            />
          );
        })}
    </ul>
  );
};

export default Expenses;
