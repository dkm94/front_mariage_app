import "./BlackButton.css";

import React from "react";

import { Button as MuiButton, ButtonProps, styled } from "@mui/material";
import { IBlackButton } from "../../../../types";

const CustomButton = styled(MuiButton)({
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
  // ":hover": {
  //   backgroundColor: "unset",
  // },
}) as typeof MuiButton;

export interface IButton extends Omit<ButtonProps, 'text'> {
  text: string;
  theme?: IBlackButton;
}

const BlackButton = ({
  text,
  ...props
}) => {
  return (
    <CustomButton
      {...props}
    >
      {text}
    </CustomButton>
  );
};

export default BlackButton;
