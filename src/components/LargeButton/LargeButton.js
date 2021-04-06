import React from 'react';
import './LargeButton.css'

const LargeButton = props => {
    return (
      <button
        onClick={props.handleClick} type={props.type} className="btn-style-s">
        {props.title}
      </button>
    );
  };

  export default LargeButton;