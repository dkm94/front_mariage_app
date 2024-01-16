import "../Header.css";

import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Button } from "@mui/material";

import Login from "../../../Pages/Auth/Login/Login";
import Register from "../../../Pages/Auth/Register/Register";
import AuthModal from "../../Modals/Auth/AuthModal";
import { Logo } from "../../../img";

const Logout = () => {
  const path: string = window.location.pathname;
  const history = useHistory();

  const [isOpen, setisOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<string>("");

  useEffect(() => {
    if (path === "/login") {
      setisOpen(true);
      setShowForm("login");
    }
    if (path === "/register") {
      setisOpen(true);
      setShowForm("register");
    }
  }, [path])

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
            sx={{ "&:hover": { backgroundColor: "inherit" } }}
            style={{ fontFamily: "none", color: "#000", border: "none", textTransform: "unset"}}
            onClick={() => {
              setisOpen(true);
              setShowForm("login");
              history.push("/login")
            }}
          >
            Connexion
          </Button>
        </ul>
      </div>

      <AuthModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => {
          setisOpen(false);
          setShowForm("");
          history.push("/")
        }}
      >
        {showForm === "login" && <Login setShowForm={setShowForm} />}
        {showForm === "register" && <Register setShowForm={setShowForm} />}
      </AuthModal>
    </div>
  );
};
export default withRouter(Logout);
