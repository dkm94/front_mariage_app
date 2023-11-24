import React from "react";
import "./Dots.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href={() => false}
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/* custom icon */}
      {children}
      <span className="threedots" />
    </a>
  ));

export default CustomToggle;