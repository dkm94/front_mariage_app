import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../img/logo-2023-no-shadow.png";

const win: Window = window;

const NavbarWithUser = () => {

  const [showLinks, setShowLinks] = useState<boolean>(false);

  const LogOut = (): void => {
    console.log("déconnexion...");
    localStorage.removeItem("token");
    win.location = "/";
  };

  const handleShowLinks = (): void => setShowLinks(!showLinks);

  return (
    <nav className={`topNavbar ${showLinks ? "show_nav" : "bg-desktop"}`}>
      <div
        className="div-logo"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        <img alt="logo" src={Logo} id="logo" />
      </div>
      <ul className="navbar__links">
        <li className="navbar__item hidden-links slideDown-1">
          <Link
            className="navbar__link"
            to="/tableau-de-bord"
            onClick={() => setShowLinks(!showLinks)}
          >
            Tableau de bord
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-2">
          <Link
            className="navbar__link"
            to="/menu/invites"
            onClick={() => setShowLinks(!showLinks)}
          >
            Les invités
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-3">
          <Link
            className="navbar__link"
            to="/menu/tables"
            onClick={() => setShowLinks(!showLinks)}
          >
            Les tables
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-4">
          <Link
            className="navbar__link"
            to="/menu/carte"
            onClick={() => setShowLinks(!showLinks)}
          >
            La carte
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-5">
          <Link
            className="navbar__link"
            to="/menu/budget"
            onClick={() => setShowLinks(!showLinks)}
          >
            Les dépenses
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-6">
          <Link
            className="navbar__link"
            to="/menu/taches"
            onClick={() => setShowLinks(!showLinks)}
          >
            Liste des tâches
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-7" id="showNavLinks">
          <Link
            className="navbar__link"
            to={"/menu/mon-compte"}
            onClick={() => setShowLinks(!showLinks)}
          >
            Votre compte
          </Link>
        </li>
        <li className="navbar__item hidden-links slideDown-8"  id="showNavLinks">
          <button className="navbar__link" type="submit" onClick={LogOut}>
            Déconnexion
          </button>
        </li>
      </ul>
      <button className="navbar__burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
};

export default NavbarWithUser;
