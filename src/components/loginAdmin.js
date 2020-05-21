import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import LoginForm from './loginForm';

class LoginAdmin extends Component {

    render(){

        return (
            <div className="adminForm">
                <LoginForm />
            </div>
        )
    }
}

export default withRouter(LoginAdmin);
