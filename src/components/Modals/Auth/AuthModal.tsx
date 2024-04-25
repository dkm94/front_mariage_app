import "./AuthModal.css";
import "../../Expenses/Graph/PieChart.css";

import React from "react";
import ReactDom from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { motion, useDragControls, useMotionValue, useAnimate } from "framer-motion";

import { IAuthModalProps } from "../../../../types";

export default function AuthModal({ 
  open, 
  children, 
  close, 
  setOpen 
}: IAuthModalProps) {

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
    close && close();
  }

  return ReactDom.createPortal(
    <>
      <div className="initial-modal">
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
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById("portal") as Element
  );
}
