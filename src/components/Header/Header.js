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
                <ul>
                    <li className="li-text"><span>Qui sommes-nous ?</span></li>
                    <li className="logo"><img alt="logo" src={Logo} onClick={this.handleClick}/></li>
                    <li className="li-text"><span>Connexion/Deconnexion</span></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Header);
