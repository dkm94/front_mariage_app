import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import MenusBox from './MenusBox';
import Footer from './Footer';

class Menus extends Component {

    render(){

        return (
            <div className="menus">
                <Header />
                <Navbar />
                <MenusBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Menus);
