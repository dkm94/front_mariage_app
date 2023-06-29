import React from "react";
import ReactDom from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import "../Expenses/Graph/PieChart.css";
import { IconButton } from "@mui/material";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "1rem",
  paddingBottom: "0",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  height: "fit-content",
  width: "100%",
  maxWidth: "500px",
  minHeight: "fit-content",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(211, 211, 211, 0.8)",
  zIndex: 1000,
};

export default function AuthModal({ open, children, close, setOpen }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={overlayStyle} onClick={close} />
      <div style={modalStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "5px",
          }}
        >
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
