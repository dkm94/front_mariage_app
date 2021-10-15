import React from 'react';
import './LargeButton.css'

const LargeButton = props => {

  const disableButtonStyle = {
    backgroundColor: 'grey',
    color: 'darkgrey',
    backgroundImage: 'none'
  }
    return (
      <button
        onClick={props.handleClick} type={props.type} disabled={props.disabled} style={props.disabled ? disableButtonStyle : null} className="btn-style-s">
        {props.title}
      </button>
    );
  };

  export default LargeButton;