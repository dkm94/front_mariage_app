import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import "../Header.css";
import Logo from "../../../img/logo.png";

const Login = () => {

    const history = useHistory()

    const LogOut = () => {
            console.log("déconnexion...")
            localStorage.removeItem("token");
            setTimeout(()=>{
                window.location.reload();
                history.replace("/");
            }, 1000);
    };

        return (
            <div className="header header-style">
                <div className="navigation container">
                    <ul>
                        <li className="li-style"><span>Qui sommes-nous ?</span></li>
                        <li className="logo"><img alt="logo" src={Logo} /></li>
                        <ul>
                            <li><Link to={"/menuAdm"}>Mariage</Link></li>
                            <li>Mon compte</li>
                            <li><Link to={"/"} onClick={LogOut}>Déconnexion</Link></li>
                        </ul>
                    </ul>
                </div>
            </div>
        )
}
export default withRouter(Login);
