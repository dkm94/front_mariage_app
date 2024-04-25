import "./Default.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";
import { motion, useDragControls, useMotionValue, useAnimate } from "framer-motion";
import Divider from '@mui/material/Divider';

export default function DefaultModal(props) {
  const { children, close, setOpen, title, setEdit, open, selectedId } = props;

  const controls = useDragControls();
  const y = useMotionValue(0);
  const [scope, animate] = useAnimate();
  
  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0]
    })

    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#motion-drawer", {
      y: [yStart, 500]
    })
    setOpen(false);
    setEdit && setEdit(null);
    close && close();
  }

  return ReactDom.createPortal(
    <>
      <div className="initial-modal">
        <div className="modal-overlay" onClick={handleClose} />
        <div className="modal-default">
          <div className="modal-default">
            <div className="modal-head">
              <h2>{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>

      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="motion-backdrop"
      ref={scope}
      >
        <motion.div
        id="motion-drawer"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        style={{ y }}
        transition={{
          ease: "easeInOut"
        }}
        onDragEnd={() => {
          if(y.get() > 100){
            handleClose()
          }
        }}
        drag={"y"}
        dragControls={controls}
        dragListener={false}
        dragConstraints={{
          top: 0,
          bottom: 0
        }}
        dragElastic={{
          top: 0,
          bottom: 0.5
        }}
        className="motion-child"
        >
          <div className="drag-handle">
            <button onPointerDown={(e) => controls.start(e)} />
          </div>
          <div className="motion-wrapper">
            <div className="modal-default">
              <div className="modal-head">
                  <h2>{title}</h2>
              </div>
              <Divider className="modal-divider"/>
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById("portal")
  );
}
