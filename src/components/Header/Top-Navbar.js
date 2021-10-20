import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo2.png";

const TopNav = () => {

    const LogOut = async () => {
        console.log("déconnexion...")
        await localStorage.removeItem("token")
        window.location = "/";
    };

    const [showLinks, setShowLinks] = useState(false);

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }
    
    return(
        <nav className={`topNavbar ${showLinks ? "show_nav" : "bg-white"}`}>
            <div className="div-logo" onClick={() => {window.location.pathname = "/"}}><img alt="logo" src={Logo} id="logo" /></div>
            <ul className="navbar__links">
                <li className="navbar__item hidden-links slideDown-1"><Link className="navbar__link" to="/tableau-de-bord" onClick={() => setShowLinks(!showLinks)}>Tableau de bord</Link></li>
                <li className="navbar__item hidden-links slideDown-2"><Link className="navbar__link" to="/menu/invites" onClick={() => setShowLinks(!showLinks)}>Les invités</Link></li>
                <li className="navbar__item hidden-links slideDown-3"><Link className="navbar__link" to="/menu/tables" onClick={() => setShowLinks(!showLinks)}>Les tables</Link></li>
                <li className="navbar__item hidden-links slideDown-4"><Link className="navbar__link" to="/menu/carte" onClick={() => setShowLinks(!showLinks)}>La carte</Link></li>
                <li className="navbar__item hidden-links slideDown-5"><Link className="navbar__link" to="/menu/budget" onClick={() => setShowLinks(!showLinks)}>Les dépenses</Link></li>
                <li className="navbar__item hidden-links slideDown-6"><Link className="navbar__link" to="/menu/taches" onClick={() => setShowLinks(!showLinks)}>Liste des tâches</Link></li>
                <li className="navbar__item hidden-links slideDown-7" id="showNavLinks"><Link className="navbar__link" to={"/menu/mon-compte"}>Votre compte</Link></li>
                <li className="navbar__item hidden-links slideDown-8" id="showNavLinks"><button className="navbar__link" type="submit" onClick={LogOut}>Déconnexion</button></li>
            </ul>
            <button className="navbar__burger" onClick={handleShowLinks} >
                <span className="burger_bar"></span>
            </button>
        </nav>
    )
}

export default TopNav;