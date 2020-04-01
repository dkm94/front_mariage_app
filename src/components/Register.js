import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import RegisterBox from './RegisterBox';

class Register extends Component {

    render(){

        return (
            <div className="register">
                <RegisterBox />
            </div>
        )
    }
}

export default withRouter(Register);
