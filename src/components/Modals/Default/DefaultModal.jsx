import "./Default.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";

export default function DefaultModal(props) {
  const { children, close, setOpen, title, setEdit, open } = props;
  console.log("🚀 ~ DefaultModal ~ title:", title)
  console.log("🚀 ~ DefaultModal ~ open:", open)
  // if (!open) return null;

  return ReactDom.createPortal(
    <>
    {/* {open && <motion.div></motion.div>} */}

      <div className="modal-overlay" onClick={close} />
      <div className="modal-default">
    {open && <motion.div className="motion-backdrop">
      MOTION</motion.div>}
        <div className="modal-head">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
  // return(
  //   <>
  //     {open && <motion.div className="motion-backdrop"></motion.div>}
  //   </>
  // )
}
