import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "../Header.css";
import Logo from "../../../img/logo2.png";

const Login = ({ userInfos: { invitationID } }) => {

    const LogOut = async () => {
            console.log("déconnexion...")
            await localStorage.removeItem("token")
            window.location = "/";
    };

        return (

            <div className="header header-style">
            
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

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to={"/"}><img alt="logo" src={Logo} id="logo" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-side" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/tableau-de-bord'}>Tableau de bord</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Organisation
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {/* <Link className="dropdown-item" to={`/menu/invitation/${invitationID}`>Invitation</Link> */}
                                    <Link className="dropdown-item" to="/menu/invités">Les invités</Link>
                                    <Link className="dropdown-item" to="/menu/tables">Les tables</Link>
                                    <Link className="dropdown-item" to="/menu/carte">La carte</Link>
                                    <Link className="dropdown-item" to="/menu/budget">Les dépenses</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/menu/mon-compte"}>Votre compte</Link>
                            </li>
                            <li className="nav-item">
                                <button  className="nav-link nav-btn-style" type="submit" onClick={LogOut}>Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                    
            </div>

        )
}
export default withRouter(Login);
