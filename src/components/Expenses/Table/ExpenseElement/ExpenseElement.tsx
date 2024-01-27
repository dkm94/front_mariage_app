import "./ExpenseElement.css";

import React from 'react';

import { Chip, styled } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';

import DefaultModal from "../../../Modals/Default/DefaultModal.jsx";
import UpdateForm from "../../../../Pages/Budget/Forms/Update/UpdateDépense";

import { OperationType } from "../../../../../types";

const CustomChip = styled(Chip)({
    height: 'auto',
    '& .MuiChip-label': {
      display: 'block',
      fontFamily: "initial",
      fontSize: '1.1rem',
      padding: "5px"
    },
  });

interface ExpenseElementProps {
    obj: OperationType;
    edit: OperationType | null;
    setEdit: (value: OperationType | null) => void;
    submit: (value: OperationType) => void;
    deleteExpense: (value: string) => void;
}

const ExpenseElement = (props: ExpenseElementProps) => {
    const { obj, edit, setEdit, submit, deleteExpense } = props;

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

    const fixPrice = (price: number | string) => {
      const fixed = price as number / 100;
      return Number(fixed).toFixed(2);
    }

  return (
    <li key={obj._id} className="fade-in table-row">
      <div className='cols cols-1' data-label="Catégorie">
          <CustomChip
          label={obj.category}
          style={{ backgroundColor: renderSwitchColors(obj.category), width: "100%", maxWidth: "150px"}} />
      </div>

      <div className='cols cols-2'  data-label="Prix">
          {" "}
          {fixPrice(obj.price)} €
      </div>

      <div className='cols cols-3'  data-label="Date">
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

      {edit?._id === obj?._id && 
      <DefaultModal
      setEdit={setEdit}
      close={() => {
          setEdit(null)
      }}
      title={"Modifier une dépense"}
      >
      <UpdateForm
      edit={edit}
      setEdit={setEdit}
      onSubmit={submit}
      deleteExpense={deleteExpense}
      />
      </DefaultModal>}
    </li>
  )
}

export default ExpenseElement