import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import RegisterBox from './RegisterBox';
import Footer from './Footer';


class Register extends Component {

    render(){

        return (
            <div className="register">
                <Header />
                <RegisterBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Register);
