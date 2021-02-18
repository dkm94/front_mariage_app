import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "../Header.css";
import Logo from "../../../img/logo.png";
// import decode from "jwt-decode";

export default function Login() {

    let history = useHistory()

    const LogOut = () => {
            console.log("déconnexion...")
            localStorage.removeItem("token");
            history.push("/");
    };

        return (
            <div className="header header-style">
                <div className="navigation container">
                    <ul>
                        <li className="li-text"><span>Qui sommes-nous ?</span></li>
                        <li className="logo"><img alt="logo" src={Logo} /></li>
                        <ul>
                            <li><Link to={"/menuAdm"}>Mariage</Link></li>
                            <li>Mon compte</li>
                            <li><button onClick={LogOut}>Déconnexion</button></li>
                        </ul>
                    </ul>
                </div>
            </div>
        )
}
