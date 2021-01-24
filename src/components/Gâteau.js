import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import CakeBox from './Gâteau';

class Cake extends Component {

    render(){

        return (
            <div className="cake">
  
                <CakeBox />

            </div>
        )
    }
}

export default withRouter(Cake);
