 import React from 'react';
 import { Link, withRouter } from 'react-router-dom';
 import "../Header.css";
 import Logo from "../../../img/logo2.png"
 
const Logout = () => {

    const path = window.location.pathname;

    return (
    <div className="header header-style" style={path === "/" ? {backgroundColor: "#e8e8e4"} : {backgroundColor: "#FFF"}}>
        <div className="navigation">
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