import "./style.css";
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { History } from "history";

import { CustomButton } from "../../../../components/Buttons";
import AuthModal from "../../../../components/Modals/Auth/AuthModal";
import Register from "../../../../Pages/Auth/Register/Register";
import Login from "../../../Auth/Login/Login";

const HomeSignup = () => {
  const history: History = useHistory();

  const [isOpen, setisOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  console.log("🚀 ~ HomeSignup ~ email:", email)
  console.log(showForm === "register");
  console.log("🚀 ~ HomeSignup ~ showForm:", showForm)
  

  const handleRegisterButton = ():void => {
    setShowForm("register");
    const currentPosition: number = window.scrollY;
    history.replace("/register", { currentPosition });
  }

  const handleCloseModal = () => {
    console.log("close modal is called")
    setisOpen(false);
    console.log("isOpen is set to false")
    setShowForm("");
    console.log("showForm is set to empty string")
  }

  return (
    <section id="home-signup-wrapper">
      <div id="signup-box">
        <span>Inscrivez-vous dès maintenant !</span>
        <form id="signup-box-form">
          <label htmlFor="home-box-email">Email</label>
          <input id="home-box-email" type="email" autoComplete="off" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          <CustomButton text="Créer un compte" onClick={handleRegisterButton} />
        </form>
        <span id="signup-gutter">Inscrivez-vous gratuitement dès maintenant et commencez à planifier !</span>
      </div>
      <AuthModal
        open={isOpen}
        setOpen={setisOpen}
        close={handleCloseModal}
      >
        {showForm === "register" && <Register setShowForm={setShowForm} email={email} />}
        {showForm === "login" && <Login setShowForm={setShowForm} />}
      </AuthModal>
    </section>
  )
}

export default HomeSignup;