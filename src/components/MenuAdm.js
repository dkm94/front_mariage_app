import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import MenuAdmBox from './menuAdmBox';

class MenuAdm extends Component {

    render(){

        return (
            <div className="menuAdm">
                <Header />
                <Navbar />
                <MenuAdmBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(MenuAdm);
