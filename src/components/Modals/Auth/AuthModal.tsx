import "./AuthModal.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import { IAuthModalProps } from "../../../../types";

export default function AuthModal({ 
  open, 
  children, 
  close, 
  setOpen 
}: IAuthModalProps) {

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="auth-overlay" onClick={() => close()} />
      <div className="auth-modal">
        <div
          className="auth-modal-close"
        >
          <IconButton onClick={close} style={{ float: "inline-end"}}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal") as Element
  );
}
