import "./ClearButton.css";

import React from "react";

import { Button } from "@mui/material";
import styled from "@emotion/styled";

const CustomButton = styled(Button)({
  fontFamily: "unset",
  fontSize: "1rem",
  borderRadius: "5px",
  paddingRight: "30px",
  paddingLeft: "30px",
  // fontWeight: "unset",
  // border: "1px solid #e0d9d9",  
  backgroundColor: "#f4f4f4",
  color: "#000000",
  width: "100%",
  textTransform: "unset",
  fontWeight: 400
});

const ClearButton = ({ text, ...rest }) => {
  return (
    <CustomButton {...rest} type="button">{text}</CustomButton>
  );
};

export default ClearButton;
