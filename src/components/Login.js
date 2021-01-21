import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';
import LoginAdmin from './loginAdmin';
import Footer from './Footer';

class Home extends Component {

    render(){

        return (
            <div className="loginAdmin">
                <Navbar />
                <LoginAdmin />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Home);
