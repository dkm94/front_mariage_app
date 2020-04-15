import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import Register from './Register';
import Footer from './Footer';

class Home extends Component {

    render(){

        return (
            <div className="home">
                <Header />
                <Navbar />
                <Register />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Home);
