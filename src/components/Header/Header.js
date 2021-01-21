import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Logo from '../..//img/logo.png';
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick = () => {
        this.props.history.push('/menuAdm')
    }

    render(){

        return (
            <div className="header">
                <div>
                    <span>Qui sommes-nous ?</span>
                </div>
                <div className="logo"><img alt="logo" src={Logo} onClick={this.handleClick}/></div>
                <div>
                    <span>Connexion/Deconnexion</span>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
