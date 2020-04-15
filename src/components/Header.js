import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Logo from '../img/logo.png';

class Header extends Component {

    render(){

        return (
            <div className="header">
                <img alt="logo" src={Logo}/>
            </div>
        )
    }
}

export default withRouter(Header);
