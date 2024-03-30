import "./style.css";

import React from 'react';
import img from "../../../../img/img-home.png";

const HomeHeader = () => {
  return (
    <section id="home-header-wrapper">
        <div id="home-header">
          <div id="header-text">
            <div className="big-text">
              <span>Prêts ?</span>
              <span>Feu...</span>
              <span>Mariés !</span>
            </div>
            <div className="small-text">
              <span>Simplifiez l'organisation de votre mariage</span>
              <span>Consultez et gérez facilement les étapes clés de votre mariage en quelques clics.</span>
              <span>My Wedding, l'outil indispensable pour ne rien oublier des préparatifs de l'un des plus beaux évènements de votre vie.</span>
            </div>
          </div>
          <div id="header-image">
            <div className="img-container">
              <img id="home-image" src={img} alt="Wedding Couple" />
            </div>
          </div>
          <div id="small-text-sm">
            <span>Simplifiez l'organisation de votre mariage</span>
            <span>Consultez et gérez facilement les étapes clés de votre mariage en quelques clics.</span>
            <span>My Wedding, l'outil indispensable pour ne rien oublier des préparatifs de l'un des plus beaux évènements de votre vie.</span>
          </div>
        </div>
    </section>
  )
}

export default HomeHeader;