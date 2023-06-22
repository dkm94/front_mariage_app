import React, { useState } from "react";
import flowersIcon from "../../../img/categoryIcons/flowers.png";
import dealIcon from "../../../img/categoryIcons/location.png";
import clothesIcon from "../../../img/categoryIcons/clothes.png";
import otherIcon from "../../../img/categoryIcons/other.png";
import mailIcon from "../../../img/categoryIcons/mail.png";
import musicIcon from "../../../img/categoryIcons/music.png";
import ringsIcon from "../../../img/categoryIcons/rings.png";
import foodIcon from "../../../img/categoryIcons/food.png";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import BlackButton from "../../../components/Buttons/Black/BlackButton.jsx";
import { alpha } from "@material-ui/core";
import UpdateForm from "./UpdateDépense";
import "./Dépenses.css";
import ClearButton from "../../../components/Buttons/Clear/ClearButton";

const Expenses = ({
  expenses,
  deleteExpense,
  updateExpense,
  searchValue,
  edit,
  setEdit,
  handleChange,
}) => {
  const renderSwitch = (categoryIcons) => {
    switch (categoryIcons) {
      case "Locations":
        return dealIcon;
      case "Habillement/Beauté":
        return clothesIcon;
      case "Décoration/Fleurs":
        return flowersIcon;
      case "Alliances/Bijoux":
        return ringsIcon;
      case "Animation":
        return musicIcon;
      case "Traiteur":
        return foodIcon;
      case "Faire-part":
        return mailIcon;
      default:
        return otherIcon;
    }
  };

  const renderSwitchColors = (categoryIconColors) => {
    switch (categoryIconColors) {
      case "Locations":
        return "#D8C7EB";
      case "Habillement/Beauté":
        return "#A8D4DD";
      case "Décoration/Fleurs":
        return "#FFEC52";
      case "Alliances/Bijoux":
        return "#F8DDA8";
      case "Animation":
        return "#FEDEE2";
      case "Traiteur":
        return "#B6DCB5";
      case "Faire-part":
        return "#C4BEA1";
      default:
        return "#E1E1E1";
    }
  };

  const submitUpdate = (obj) => {
    updateExpense(obj);
  };

  return (
    <ul className="col budget-list">
      {expenses
        .filter((expense) => {
          return (
            expense.description
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) >= 0
          );
        })
        .reverse()
        .map((obj) => {
          let prix = obj.price / 100;
          function financial(prix) {
            return Number(prix).toFixed(2);
          }
          return (
            <li
              key={obj._id}
              style={{
                backgroundColor: alpha(renderSwitchColors(obj.category), 0.2),
                border: `3px solid #f4f4f4`,
              }}
              className="mb-3 expenses-container fade-in"
            >
              <div className="expense-li">
                {/* <div className="expense-li___btn">
                  <IconButton>
                    <CreateIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </div> */}
                {edit?._id === obj?._id ? (
                  <UpdateForm
                    edit={edit}
                    setEdit={setEdit}
                    onSubmit={submitUpdate}
                    handleChange={handleChange}
                  />
                ) : (
                  <>
                    <div>
                      <div className="expense__li__style">
                        <div>
                          <span>{obj.description}</span>
                          <span>{obj.category}</span>
                        </div>
                        <div>
                          <span>{financial(prix)} €</span>
                          <span>{obj.date}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "1rem",
                          marginBottom: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.5rem 1.5rem",
                        }}
                      >
                        <ClearButton
                          style={{ borderRadius: "36px" }}
                          onClick={() => setEdit(obj)}
                          variant="contained"
                          text="Modifier"
                        />
                        <BlackButton
                          onClick={() => {
                            deleteExpense(obj._id);
                          }}
                          variant="contained"
                          text="Supprimer"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Expenses;
