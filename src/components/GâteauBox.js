import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class CakeBox extends Component {

    render(){

        return (
            <div className="cakeBox">
                <h1>Mes gâteaux</h1>
                <div className="addCake">
                    <div className="addCakeCroix">+</div>
                </div>
            </div>
        )
    }
}

export default withRouter(CakeBox);
