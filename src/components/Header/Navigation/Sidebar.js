import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "../Header.css";
import Logo from "../../../img/logo2.png";
import { NavigationData } from "./NavigationData";

const Login = () => {

    console.log("in")

        return (

            <nav className="sidebar">
                {/* <div className="navigation container">
                    <div id="brand">
                        <Link to={"/"}><img alt="logo" src={Logo} id="logo" /></Link>
                    </div>
                    <ul className="navbar-menu">
                        <li className="li-style"><Link to={"/menu"}>Organisation</Link></li>
                        <li className="li-style"><Link to={"/mon-compte"}>Votre compte</Link></li>
                        <li className="li-style"><button type="submit" onClick={LogOut}>Déconnexion</button></li>
                    </ul>
                </div> */}

                

                <ul className="sidebarList">
                    {NavigationData.map((val, key) => {
                        return(
                            <li 
                                key={key}
                                className="menu-row"
                                id={window.location.pathname === val.pathname ? "active" : ""}
                                onClick={() => {window.location.pathname = val.pathname}}
                            >
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        )
                    })}
                </ul>
                    
            </nav>

        )
}
export default withRouter(Login);
