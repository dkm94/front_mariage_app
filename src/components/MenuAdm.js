import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import MenuAdmBox from './menuAdmBox';

class MenuAdm extends Component {

    render(){

        return (
            <div className="menuAdm">
                <Navbar />
                <MenuAdmBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(MenuAdm);
