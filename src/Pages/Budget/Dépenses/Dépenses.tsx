import "./Dépenses.css";

import React from "react";

import ExpenseElement from "../../../components/Expenses/Table/ExpenseElement/ExpenseElement";

import { headerItems } from '../../../data';
import { OperationType } from "../../../../types";

interface ExpensesProps {
  expenses: OperationType[];
  deleteExpense: (id: string) => void;
  updateExpense: (operation:OperationType) => Promise<void>;
  searchValue: string;
  edit: OperationType | null;
  setEdit: (operation: OperationType | null) => void;
}

const Expenses = (props: ExpensesProps) => {
  const { expenses, deleteExpense, updateExpense, searchValue, edit, setEdit } = props;
  const submitUpdate = (obj): void => {
    updateExpense(obj);
  };

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
            submit={submitUpdate} 
            deleteExpense={deleteExpense} 
            />
          );
        })}
    </ul>
  );
};

export default Expenses;
