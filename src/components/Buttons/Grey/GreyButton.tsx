import "./GreyButton.css";

import React from "react";
import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)({
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
});

const GreyButton = ({
  size,
  variant,
  type,
  style,
  text,
  disabled,
  ...rest
}) => {
  return (
    <CustomButton
      {...rest}
      size={size}
      variant={variant}
      type={type}
      style={style}
      disabled={disabled}
    >
      {text}
    </CustomButton>
  );
};

export default GreyButton;
