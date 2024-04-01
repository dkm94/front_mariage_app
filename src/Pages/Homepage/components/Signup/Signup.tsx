import "./style.css";
import React from 'react'

import { CustomButton } from "../../../../components/Buttons";

const HomeSignup = () => {
  return (
    <section id="home-signup-wrapper">
      <div id="signup-box">
        <span>Inscrivez-vous dès maintenant !</span>
        <form id="signup-box-form">
          <label htmlFor="home-box-email">Email</label>
          <input id="home-box-email" type="email" autoComplete="off" name="email" value={""} />
          <CustomButton text="Créer un compte" />
        </form>
        <span id="signup-gutter">Inscrivez-vous gratuitement dès maintenant et commencez à planifier !</span>
      </div>
    </section>
  )
}

export default HomeSignup;