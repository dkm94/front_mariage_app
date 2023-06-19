import React from "react";
import { Button, styled } from "@mui/material";
import "./ClearButton.css";

const CustomButton = styled(Button)({
  textTransform: "unset",
  border: "1px solid #e0d9d9",
  backgroundColor: "#f4f2f2",
  color: "#000",
  //   fontfamily: "unset",
  fontSize: "1rem",
  //   borderRadius: "15px",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontWeight: "unset",
  fontFamily: "Playfair Display serif",
  width: "fit-content",
  ":hover": {
    backgroundColor: "inherit",
    color: "#000",
    animation: "none",
    // border: "none",
  },
});

const ClearButton = ({ size, variant, type, style, text }) => {
  return (
    <CustomButton size={size} variant={variant} type={type} style={style}>
      {text}
    </CustomButton>
  );
};

export default ClearButton;
