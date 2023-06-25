import React from "react";
import "./ScreenLoader.css";

const ScreenLoader = () => {
  return (
    <div className="loading-wrapper">
      <span className="dot"></span>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScreenLoader;
