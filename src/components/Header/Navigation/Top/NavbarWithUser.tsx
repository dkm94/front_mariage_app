import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from ".././../../../img/logo-2023-no-shadow.png";
import { NavigationData } from "../NavigationData";
import { NavigationDataType } from "../../../../../types/index";
import NavbarLink from "./NavbarLink";

const win: Window = window;

const NavbarWithUser = () => {

  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [links, setLinks] = useState<NavigationDataType[]>([]);

  useEffect(() => setLinks(NavigationData), []);

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
        {links && links.map(({ title, pathname }, i) => <NavbarLink key={i} idx={i} path={pathname} title={title} handleClick={handleShowLinks} />)}
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
