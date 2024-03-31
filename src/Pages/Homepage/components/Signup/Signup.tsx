import "./style.css";
import React from 'react'

import { CustomButton } from "../../../../components/Buttons";

const HomeSignup = () => {
  return (
    <section id="home-signup-wrapper">
      <div id="signup-box">
        <span>Inscrivez-vous dès maintenant !</span>
        <form id="signup-box-form">
          <input type="text" autoComplete="off" name="email" value={""} />
          <CustomButton text="Créer un compte" />
        </form>
      </div>
    </section>
  )
}

export default HomeSignup;