import "./Default.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";

export default function DefaultModal({ children, close, setOpen, title, setEdit }) {
  // if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={close} />
      <div className="modal-default">
        <div className="modal-head">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
