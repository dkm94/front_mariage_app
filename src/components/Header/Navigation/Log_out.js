 import React from 'react';
 import { Link } from 'react-router-dom';
 import "../Header.css";
 import Logo from "../../../img/logo.png"
 
 export default function Logout(){

         return (
            <div className="header">
                <div className="navigation">
                    <ul>
                        <li className="li-text"><span>Qui sommes-nous ?</span></li>
                        <li className="logo"><img alt="logo" src={Logo} /></li>
                        <li className="li-text"><Link to={"/register"}>Connexion</Link></li>
                    </ul>
                </div>
            </div>
         )
 }
 