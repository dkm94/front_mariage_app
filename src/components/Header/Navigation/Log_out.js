 import React from 'react';
 import { Link, withRouter } from 'react-router-dom';
 import "../Header.css";
 import Logo from "../../../img/logo2.png"
 
const Logout = () => {
 
    return (
    <div className="header header-style">
        <div className="navigation container">
            <div id="brand">
                <Link to={{ pathname: "/"}}><img alt="logo" src={Logo} id="logo" /></Link>
            </div>
            <ul className="navbar-menu">
                <li className="li-style" id="login"><Link to={"/login"}>Connexion</Link></li>
            </ul>
        </div>
    </div>
    )
}
export default withRouter(Logout)