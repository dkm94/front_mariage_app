import "../Header.css";

import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@mui/material";

import Login from "../../../Pages/Auth/Login/Login.tsx";
import Register from "../../../Pages/Auth/Register/Register.js";
import AuthModal from "../../Modals/AuthModal.jsx";
import Logo from "../../../img/logo-2023-no-shadow.png";

const Logout = () => {
  const path = window.location.pathname;

  const [isOpen, setisOpen] = useState(false);
  const [showForm, setShowForm] = useState("");

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
          <Button
            variant="outlined"
            className="li-style"
            id="login"
            style={{ fontFamily: "none", color: "#000" }}
            onClick={() => {
              setisOpen(true);
              setShowForm("login");
            }}
          >
            Connexion
          </Button>
        </ul>
      </div>

      <AuthModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => setisOpen(false)}
      >
        {showForm === "login" && <Login setShowForm={setShowForm} />}
        {showForm === "register" && <Register setShowForm={setShowForm} />}
      </AuthModal>
    </div>
  );
};
export default withRouter(Logout);
