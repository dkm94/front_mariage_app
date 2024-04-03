import "./CustomButton.css";

import React from "react";

import { Button } from "@mui/material";

// import { IBlackButton } from "../../../../types";

// export interface IButton extends Omit<ButtonProps, 'text'> {
//   text: string;
//   theme?: IBlackButton;
// }

const CustomButton = ({
  text,
  ...props
}) => {

  return (
    <Button
      color={props.color && props.color}
      {...props}
      style={{
      textTransform: "unset",
      backgroundColor: props.backgroundColor ? props.backgroundColor : "#262626",
      color: props.color ? props.color : "#fff",
      fontFamily: "unset",
      fontSize: "1rem",
      borderRadius: props.borderRadius ? props.borderRadius : "36px",
      paddingRight: "30px",
      paddingLeft: "30px",
      fontWeight: props?.fontWieght ? props.fontWeight : "unset",
      // fontFamily: "Playfair Display serif",
      // border: props.border && "none",
      width: props.width ? props.width : "auto",
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
