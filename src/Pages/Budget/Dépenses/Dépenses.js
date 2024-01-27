import "./Dépenses.css";

import React from "react";

import ExpenseElement from "../../../components/Expenses/Table/ExpenseElement/ExpenseElement";

const headerItems = [
  "Catégorie",
  "Prix",
  "Date",
  "Description",
  "Gérer",
]

const Expenses = ({
  expenses,
  deleteExpense,
  updateExpense,
  searchValue,
  edit,
  setEdit,
}) => {

  const submitUpdate = (obj) => {
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
