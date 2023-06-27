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
import { Button, IconButton } from "@mui/material";
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
    <ul className="budget-list">
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
                // backgroundColor: alpha(renderSwitchColors(obj.category), 0.2),
                backgroundColor: edit?._id === obj?._id && "#FFF",
              }}
              className="mb-3 expenses-container fade-in"
            >
              <div className="expense-li">
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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: renderSwitchColors(obj.category),
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              borderRadius: "15px",
                              display: "flex",
                              alignContent: "center",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                placeSelf: "center",
                                color: "grey",
                                fontFamily: "none",
                              }}
                            >
                              {obj.category}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "none",
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              color: "#4f4e4e",
                            }}
                          >
                            {" "}
                            {financial(prix)} €
                          </span>
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <span
                            style={{
                              fontFamily: "none",
                              paddingLeft: "10px",
                              color: "grey",
                            }}
                          >
                            {obj.date}
                          </span>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <span style={{ fontSize: "1.2rem" }}>
                            {obj.description}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "2rem",
                          display: "flex",
                          justifyContent: "end",
                        }}
                        className="edit-todo"
                      >
                        <BlackButton
                          onClick={() => setEdit(obj)}
                          variant={"outlined"}
                          text={"Modifier"}
                          style={{
                            backgroundColor: "unset",
                            color: "unset",
                            border: "1px solid #000",
                          }}
                        />

                        {/* <BlackButton
                          onClick={() => {
                            deleteExpense(obj._id);
                          }}
                          variant="contained"
                          text="Supprimer"
                        /> */}
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
