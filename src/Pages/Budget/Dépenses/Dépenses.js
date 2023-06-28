import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
// import { alpha } from "@material-ui/core";
import UpdateForm from "./UpdateDépense";
import "./Dépenses.css";
import DefaultModal from "../../../components/Modals/DefaultModal";

const Expenses = ({
  expenses,
  deleteExpense,
  updateExpense,
  searchValue,
  edit,
  setEdit,
  handleChange,
  isOpen,
  setisOpen,
}) => {
  // const renderSwitch = (categoryIcons) => {
  //   switch (categoryIcons) {
  //     case "Locations":
  //       return dealIcon;
  //     case "Habillement/Beauté":
  //       return clothesIcon;
  //     case "Décoration/Fleurs":
  //       return flowersIcon;
  //     case "Alliances/Bijoux":
  //       return ringsIcon;
  //     case "Animation":
  //       return musicIcon;
  //     case "Traiteur":
  //       return foodIcon;
  //     case "Faire-part":
  //       return mailIcon;
  //     default:
  //       return otherIcon;
  //   }
  // };

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
                    {/* <BlackButton
                      onClick={() => {
                        setEdit(obj);
                        setisOpen(true);
                      }}
                      variant={"outlined"}
                      text={"Modifier"}
                      style={{
                        backgroundColor: "unset",
                        color: "unset",
                        border: "1px solid #000",
                      }}
                    /> */}
                    <IconButton
                      onClick={() => {
                        setEdit(obj);
                        setisOpen(true);
                      }}
                    >
                      <CreateIcon fontSize="small" />
                    </IconButton>

                    {/* <BlackButton
                          onClick={() => {
                            deleteExpense(obj._id);
                          }}
                          variant="contained"
                          text="Supprimer"
                        /> */}
                  </div>
                  <DefaultModal
                    open={isOpen}
                    setOpen={setisOpen}
                    close={() => {
                      setisOpen(false);
                    }}
                  >
                    <UpdateForm
                      edit={edit}
                      setEdit={setEdit}
                      onSubmit={submitUpdate}
                      handleChange={handleChange}
                      deleteExpense={deleteExpense}
                    />
                  </DefaultModal>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Expenses;
