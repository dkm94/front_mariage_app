import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import HomePicture from "../img/book.jpg";
import LoginAdmin from "./loginAdmin";
import Footer from './Footer';

class Home extends Component {

    render(){

        return (
            <div className="home">
                <Header />
                <div className="homePicture">
                    <img alt="logo" src={HomePicture} />
                </div>
                <LoginAdmin />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Home);
