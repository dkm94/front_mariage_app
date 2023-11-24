import "./GreyButton.css";

import React from "react";

import { Button as MuiButton, ButtonProps, styled } from "@mui/material";
import { IGreyButton } from "../../../../types";

const CustomButton = styled(MuiButton)({
  textTransform: "unset",
  backgroundColor: "#b2a9a9",
  color: "#fff",
  fontSize: "1rem",
  borderRadius: "36px",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontWeight: "unset",
  fontFamily: "Playfair Display serif",
  border: "none",
  width: "fit-content",
  ":hover": {
    background: "#a09898",
    animation: "none",
    border: "none",
  },
}) as typeof MuiButton;

export interface IButton extends Omit<ButtonProps, 'text'> {
  text: string;
  theme?: IGreyButton;
}

const GreyButton = ({ text, ...props }: IButton) => {

  return (
    <CustomButton
      {...props}
    >
      {text}
    </CustomButton>
  );
};

export default GreyButton;
