import "./ClearButton.css";

import React from "react";

import { Button } from "@mui/material";

const ClearButton = ({ text, ...rest }) => {
  return (
    <Button
      {...rest}
      style={{
        fontFamily: "unset",
        fontSize: "1rem",
        borderRadius: "36px",
        paddingRight: "30px",
        paddingLeft: "30px",
        fontWeight: "unset",
        border: "1px solid #e0d9d9",
        backgroundColor: "#f4f2f2",
        color: "#a5a4a4",
      }}
    >
      {text}
    </Button>
  );
};

export default ClearButton;
