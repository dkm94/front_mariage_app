import "./Dépenses.css";

import React from "react";

import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import { Chip } from '@material-ui/core';

import UpdateForm from "./UpdateDépense";
import DefaultModal from "../../../components/Modals/Default/DefaultModal";

const Expenses = ({
  expenses,
  deleteExpense,
  updateExpense,
  searchValue,
  edit,
  setEdit,
  handleChange,
}) => {

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

  const fixPrice = (price) => {
    const fixed = price / 100;
    return Number(fixed).toFixed(2);
  }

  return (
    <ul className="budget-list">
      <li className="table-header">
        <div className="cols cols-1">Catégorie</div>
        <div className="cols cols-2">Date</div>
        <div className="cols cols-3">Prix</div>
        <div className="cols cols-4">Description</div>
        <div className="cols cols-5">Gérer</div>
      </li>
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
          return (
            <li
              key={obj._id}
              style={{
                backgroundColor: edit?._id === obj?._id && "#FFF",
              }}
              className="fade-in table-row"
            >
              <div className='cols cols-1' data-label="Catégorie">
                  <Chip
                  sx={{
                    height: 'auto',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                    },
                  }}
                  label={obj.category}
                  style={{ backgroundColor: renderSwitchColors(obj.category), width: "100%", maxWidth: "150px"}} />
                </div>
              <div className='cols cols-2'  data-label="Date">
                {" "}
                {fixPrice(obj.price)} €
              </div>
              <div className='cols cols-3'  data-label="Prix">
                {obj.date}
              </div>
              <div className='cols cols-4'  data-label="Description">
                {obj.description}
              </div>
              <div className='cols cols-5'  data-label="Gérer">
                <IconButton
                  onClick={() => {
                    setEdit(obj);
                  }}
                >
                  <CreateIcon fontSize="small" />
                </IconButton>
              </div>
                  {edit?._id === obj?._id && <DefaultModal
                    setEdit={setEdit}
                    close={() => {
                      setEdit(null)
                    }}
                    title={"Modifier une dépense"}
                  >
                    <UpdateForm
                      edit={edit}
                      setEdit={setEdit}
                      onSubmit={submitUpdate}
                      handleChange={handleChange}
                      deleteExpense={deleteExpense}
                    />
                  </DefaultModal>}
            </li>
          );
        })}
    </ul>
  );
};

export default Expenses;
