import React from "react";
import "./Square.css";

const SquareButton = props => {

    const disableButtonStyle = {
        backgroundColor: 'grey',
        color: 'darkgrey',
        backgroundImage: 'none'
      }

    return(
        <>
            <input 
                type={props.type} 
                disabled={props.disabled} 
                style={props.disabled ? disableButtonStyle : null} 
                className="square-btn"
            >
            {props.title}
            </input>
        </>
    )
}
export default SquareButton;