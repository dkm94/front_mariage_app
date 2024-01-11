import "./Dépenses.css";

import React from "react";

import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import { Chip, styled } from '@material-ui/core';

import UpdateForm from "../Forms/Update/UpdateDépense";
import DefaultModal from "../../../components/Modals/Default/DefaultModal";

const CustomChip = styled(Chip)({
  height: 'auto',
  '& .MuiChip-label': {
    display: 'block',
    fontFamily: "initial",
    fontSize: '1.1rem',
    padding: "5px"
  },
});

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
            <li
              key={obj._id}
              style={{
                backgroundColor: edit?._id === obj?._id && "#FFF",
              }}
              className="fade-in table-row"
            >
              <div className='cols cols-1' data-label="Catégorie">
                  <CustomChip
                  sx={{
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
