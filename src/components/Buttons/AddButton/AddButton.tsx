import "./style.css";
import React from 'react';

import { Button as MuiButton, ButtonProps, styled } from "@mui/material";

// interface AddButtonProps extends ButtonProps {}

const CustomButton = styled(MuiButton)({
    backgroundColor: "#262626", 
    width: "fit-content", 
    color: "#fff", 
    textTransform: "capitalize", 
    border: "none", 
    display: "flex", 
    flexDirection: "row", 
    gap: "10px", 
    paddingRight: "15px", 
    borderRadius: "36px",
    fontFamily: "'Karla', sans-serif",
    "&:hover": {
        background: "#333232",
      },
  }) as typeof MuiButton;
  
const AddButton = (props: ButtonProps) => {
  return (
    <CustomButton variant="contained" {...props}>
        <span className="material-symbols-outlined">add</span>
        <span>Ajouter</span>
    </CustomButton>
  )
}

export default AddButton