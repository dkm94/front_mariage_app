import React from "react";
import "./Home.css";
import { Col, Container } from "react-bootstrap";

const Card = ({ index, icon, title, description }) => {
  return (
      <div key={index} className="home-cards" id="intro-card">
        <div className="home-cards__img">
          <img src={icon} alt="icône invités" />
        </div>
        <div className="home-cards__title">
          <h3>{title}</h3>
        </div>
        <div>
          <span>{description}</span>
        </div>
      </div>
  );
};

export default Card;
