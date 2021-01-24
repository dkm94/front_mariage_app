import React from 'react';
import './LargeButton.css'

const LargeButton = props => {
    return (
      <button
        onClick={props.handleClick} className="btn-style-s">
        {props.title}
      </button>
    );
  };

  export default LargeButton;