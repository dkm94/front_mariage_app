import "./Home.css";
import "../../components/LargeButton/LargeButton.css";

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container } from "@mui/material";

import Card from "./Card.jsx";
import dashboardCards from "./data.js";
import Register from '../Auth/Register/Register.js';
import Login from '../Auth/Login/Login.tsx';
import AuthModal from '../../components/Modals/AuthModal.jsx';
import introImg from "../../img/section-2-img.jpg";

const Home = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<string>("");

  return (
    <>
      <div
        className="banner-section"
      >
        <div className='banner-text'>
          <span>Prêts, feu ?</span><br />
          <span>Mariés !</span>
        </div>

      </div>
      <div className='intro-section'>
        <Container className='container csctn'>
        <div className='intro'>
          <h1>Simplifiez l'organisation de votre mariage</h1>
          <p>
            <span>
              Consultez et gérez facilement les étapes clés de votre
              mariage en quelques clics.
            </span>
            <span>
              My Wedding, l'outil indispensable pour ne rien oublier des
              préparatifs de l'un des plus beaux évènements de votre
              vie.
            </span>
          </p>
          <div className="register-btn">
              <Button
                className="home-link"
                style={{ fontSize: "1.2rem" }}
                onClick={() => {
                  setisOpen(true);
                  setShowForm("register");
                }}
              >
                Inscrivez-vous
              </Button>
          </div>
          </div>
          <div className='intro-img'>
            <img src={introImg} alt='introduction'/>
          </div>

        </Container>
      </div>
      <div className='presentation-section'>
        <Container className='container'>
          <div className="section-2___titre">
            <h2>Comment ça fonctionne</h2>
          </div>
          <div className="section-2___sous-titre">
            <span>
              Votre tableau de bord vous apporte une vue d'ensemble des éléments
              ajoutés aux différentes catégories.
            </span>
          </div>
          <div className='cards-container'>
              {dashboardCards.map((card, i) => {
                return (
                  <Card
                    index={i}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                );
              })}
          </div>
        </Container>
      </div>
      <AuthModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => setisOpen(false)}
      >
        {showForm === "register" && <Register setShowForm={setShowForm} />}
        {showForm === "login" && <Login setShowForm={setShowForm} />}
      </AuthModal>
    </>
  );
};

export default withRouter(Home);
