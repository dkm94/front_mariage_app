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
    background: "#4c4a4a",
    animation: "none",
    border: "none",
  },
});

const BlackButton = ({
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

export default BlackButton;
