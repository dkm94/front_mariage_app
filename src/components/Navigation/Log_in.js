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
            <div className="header header-style">
                <div className="navigation container">
                    <ul>
                        <li className="li-text"><span>Qui sommes-nous ?</span></li>
                        <li className="logo"><img alt="logo" src={Logo} /></li>
                        <ul>
                            <li><Link to={"/menuAdm"}>Mariage</Link></li>
                            <li>Mon compte</li>
                            <li><Link to={"/register"}>Déconnexion</Link></li>
                        </ul>
                    </ul>
                </div>
            </div>
        )
}
