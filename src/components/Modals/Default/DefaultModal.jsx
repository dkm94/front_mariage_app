import "./Default.css";

import React from "react";
import ReactDom from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import "../../Expenses/Graph/PieChart.css";
import { IconButton } from "@mui/material";

export default function DefaultModal({ open, children, close, setOpen, title, setEdit }) {
  // if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={close} />
      <div className="modal-default">
        <div className="modal-head">
          <h2>{title}</h2>
          <IconButton onClick={() => setEdit({
            id: null,
            name: ""
          })}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
