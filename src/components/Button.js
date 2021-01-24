import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Button extends Component {

    render(){

        return (
            <div className="button button-center">
                <button type="submit">VALIDER</button>
            </div>
        )
    }
}

export default withRouter(Button);
