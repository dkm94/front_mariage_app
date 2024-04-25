import "./CustomButton.css";

import React from "react";

import { Button } from "@mui/material";

// import { IBlackButton } from "../../../../types";

// export interface IButton extends Omit<ButtonProps, 'text'> {
//   text: string;
//   theme?: IBlackButton;
// }

const CustomButton = (props) => {

  return (
    <Button
      type={props.type ?? "button"}
      variant={props.variant}
      color={props.color && props.color}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
      textTransform: "unset",
      backgroundColor: props.backgroundColor ? props.backgroundColor : "#262626",
      color: props.color ? props.color : "#fff",
      fontFamily: "unset",
      fontSize: "1rem",
      borderRadius: props.borderRadius ? props.borderRadius : "36px",
      paddingRight: "30px",
      paddingLeft: "30px",
      fontWeight: props?.fontWeight ? props.fontWeight : "unset",
      border: props.border ? props.border : "none",
      width: props.width ? props.width : "auto",
      }}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
