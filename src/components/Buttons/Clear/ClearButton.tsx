import "./ClearButton.css";

import React from "react";

import { Button } from "@mui/material";
import styled from "@emotion/styled";

const CustomButton = styled(Button)({
  fontFamily: "unset",
  fontSize: "1rem",
  borderRadius: "36px",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontWeight: "unset",
  border: "1px solid #e0d9d9",
  backgroundColor: "#f4f2f2",
  color: "#a5a4a4",
  width: "100%",
});

const ClearButton = ({ text, ...rest }) => {
  return (
    <CustomButton {...rest} type="button">{text}</CustomButton>
  );
};

export default ClearButton;
