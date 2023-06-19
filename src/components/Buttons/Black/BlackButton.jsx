import React from "react";
import { Button, styled } from "@mui/material";
import "./BlackButton.css";

const CustomButton = styled(Button)({
  textTransform: "unset",
  backgroundColor: "#262626",
  color: "#fff",
  //   fontfamily: "unset",
  fontSize: "1rem",
  borderRadius: "36px",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontWeight: "unset",
  fontFamily: "Playfair Display serif",
  border: "none",
  width: "fit-content",
  ":hover": {
    background: "#383636",
    animation: "none",
    border: "none",
  },
});

const BlackButton = ({ size, variant, type, style, text }) => {
  return (
    <CustomButton size={size} variant={variant} type={type} style={style}>
      {text}
    </CustomButton>
  );
};

export default BlackButton;
