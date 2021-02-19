 import React from 'react';
 import { Link, withRouter } from 'react-router-dom';
 import "../Header.css";
 import Logo from "../../../img/logo.png"
 
const Logout = () => {
    return (
    <div className="header">
        <div className="navigation container">
            <ul>
                <li className="li-style" id="about"><span>Qui sommes-nous ?</span></li>
                <li className="logo"><img alt="logo" src={Logo} /></li>
                <li className="li-style" id="login"><Link to={"/register"}>Connexion</Link></li>
            </ul>
        </div>
    </div>
    )
}
export default withRouter(Logout)