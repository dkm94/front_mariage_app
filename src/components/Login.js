import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import LoginAdmin from './loginAdmin';
import Footer from './Footer';

class Home extends Component {

    render(){

        return (
            <div className="loginAdmin">
                <Header />
                <Navbar />
                <LoginAdmin />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Home);
