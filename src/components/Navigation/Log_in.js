import React from 'react';
import { Link } from 'react-router-dom';
import "../Header/Header.css";
import Logo from "../../img/logo.png";
// import decode from "jwt-decode";

export default function Login() {

    // localStorage.getItem("token");
    // const token = localStorage.getItem('token')
    // const user = decode(token);


 
        return (
            <div className="header">
                <div className="navigation">
                    <ul>
                        <li className="li-text"><span>Qui sommes-nous ?</span></li>
                        <li className="logo"><img alt="logo" src={Logo} /></li>
                        <li className="li-text"><Link to={"/register"}>Déconnexion</Link></li>
                    </ul>
                </div>
            </div>
        )
}
