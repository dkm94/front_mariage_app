import "./BlackButton.css";

import React from "react";

import { Button, ButtonProps } from "@mui/material";

import { IBlackButton } from "../../../../types";

export interface IButton extends Omit<ButtonProps, 'text'> {
  text: string;
  theme?: IBlackButton;
}

const BlackButton = ({
  text,
  ...props
}) => {

  return (
    <Button
      {...props}
      style={{
      textTransform: "unset",
      backgroundColor: "#262626",
      color: "#fff",
      fontFamily: "unset",
      fontSize: "1rem",
      borderRadius: "36px",
      paddingRight: "30px",
      paddingLeft: "30px",
      fontWeight: "unset",
      // fontFamily: "Playfair Display serif",
      border: "none",
      }}
    >
      {text}
    </Button>
  );
};

export default BlackButton;
