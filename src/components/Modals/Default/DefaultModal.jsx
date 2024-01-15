import "./Default.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function DefaultModal({ open, children, close, setOpen, title, setEdit }) {
  // if (!open) return null;

  function handleClose() {
    if(setEdit) {
      setEdit(null);
    } else {
      setOpen(false);
    }
  }
  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={close} />
      <div className="modal-default">
        <div className="modal-head">
          <h2>{title}</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
