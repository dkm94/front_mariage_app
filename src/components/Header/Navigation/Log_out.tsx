import "../Header.css";

import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import Login from "../../../Pages/Auth/Login/Login";
import Register from "../../../Pages/Auth/Register/Register";
import AuthModal from "../../Modals/Auth/AuthModal";
import { Logo } from "../../../img";
import { CustomButton } from "../../Buttons";

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
          ? { backgroundColor: "#D2C5C5" }
          : { backgroundColor: "#FFF" }
      }
    >
      <div className="navigation" style={
        path === "/"
          ? { backgroundColor: "#F0EEEC" }
          : { backgroundColor: "#FFF" }
      }>
        <div id="brand">
          <Link to={{ pathname: "/" }}>
            <img alt="logo" src={Logo} id="logo" />
          </Link>
        </div>
        <ul className="navbar-menu">
          <CustomButton
            id="login"
            onClick={() => {
              setisOpen(true);
              setShowForm("login");
              history.push("/login")
            }}
            text={"Connexion"}
          />
        </ul>
      </div>

      <AuthModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => {
          setisOpen(false);
          setShowForm("");

          const currentPosition: number = window.scrollY;
          history.replace("/", { currentPosition });
        }}
      >
        {showForm === "login" && <Login setShowForm={setShowForm} />}
        {showForm === "register" && <Register setShowForm={setShowForm} />}
      </AuthModal>
    </div>
  );
};
export default withRouter(Logout);
