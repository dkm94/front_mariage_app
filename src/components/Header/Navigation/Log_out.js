import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../Header.css";
import Logo from "../../../img/logo-2023-no-shadow.png";
import { Button } from "@mui/material";

const Logout = () => {
  const path = window.location.pathname;

  return (
    <div
      className="header header-style"
      style={
        path === "/"
          ? { backgroundColor: "#e8e8e4" }
          : { backgroundColor: "#FFF" }
      }
    >
      <div className="navigation">
        <div id="brand">
          <Link to={{ pathname: "/" }}>
            <img alt="logo" src={Logo} id="logo" />
          </Link>
        </div>
        <ul className="navbar-menu">
          <Button variant="outlined" className="li-style" id="login">
            <Link to={"/login"}>Connexion</Link>
          </Button>
        </ul>
      </div>
    </div>
  );
};
export default withRouter(Logout);
