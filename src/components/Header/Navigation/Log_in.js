import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "../Header.css";
import Logo from "../../../img/logo2.png";

const Login = () => {

    // const history = useHistory()

    const LogOut = async () => {
            console.log("déconnexion...")
            await localStorage.removeItem("token");
            window.location = "/" ;
    };

        return (
            <div className="header header-style">
                <div className="navigation container">
                    <div id="brand">
                        <Link to={"/"}><img alt="logo" src={Logo} id="logo" /></Link>
                    </div>
                    <ul className="navbar-menu">
                        <li className="li-style"><Link to={"/menuAdm"}>Mariage</Link></li>
                        <li className="li-style">Mon compte</li>
                        <li className="li-style" id="about"><span>Qui sommes-nous ?</span></li>
                        <li><Link to={"/"} onClick={LogOut}>Déconnexion</Link></li>
                    </ul>
                </div>
            </div>
        )
}
export default withRouter(Login);
