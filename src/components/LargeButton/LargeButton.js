import React from 'react';
import './LargeButton.css'

const LargeButton = props => {
    return (
      <button
        onClick={props.handleClick} className="btn-style" style={props.style}>
        {props.title}
      </button>
    );
  };

  export default LargeButton;