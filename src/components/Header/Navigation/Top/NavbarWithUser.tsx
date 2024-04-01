import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from ".././../../../img/logo-2023-no-shadow.png";
import { UserType } from "../../../../../types/index";
import MenuGrid from "./MenuGrid/MenuGrid";

const win: Window = window;

interface NavbarWithUserProps {
  userInfos: UserType;
}

const NavbarWithUser = (props:NavbarWithUserProps) => {
  const { userInfos } = props;

  const [showLinks, setShowLinks] = useState<boolean>(false);
  // const [links, setLinks] = useState<NavigationDataType[]>([]);

  // useEffect(() => setLinks(NavigationData), []);

  const logout = (): void => {
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
      <div className="navbar__links glass">
        <MenuGrid mariageID={userInfos?.mariageID!} userId={userInfos?.id!} showMenu={setShowLinks} />
        {!showLinks && (
          <>
            <li className="navbar__item hidden-links slideDown-7" id="showNavLinks">
              <Link
                className="navbar__link"
                to={`/compte/${userInfos?.id}/configuration`}
                onClick={() => setShowLinks(!showLinks)}
              >
                Paramètres
              </Link>
            </li>
            <li className="navbar__item hidden-links slideDown-8"  id="showNavLinks">
              <button className="navbar__link" type="submit" onClick={logout}>
                Déconnexion
              </button>
            </li>
          </>
        )}
      </div>
      <button className="navbar__burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
};

export default NavbarWithUser;
