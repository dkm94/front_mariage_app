import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import HomePicture from "../img/book.jpg";
// import LoginAdmin from "./loginAdmin";
import LoginForm from "./loginForm";

import Footer from './Footer';

class Home extends Component {

    render(){

        return (
            <div className="home">
                <div className="homePicture">
                    <img alt="logo" src={HomePicture} />
                </div>
                <LoginForm />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Home);
