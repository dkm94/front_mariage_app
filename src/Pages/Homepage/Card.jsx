import React from "react";
import "./Home.css";
import { Col, Container } from "react-bootstrap";

const Card = ({ index, icon, title, description }) => {
  return (
    <Col xs={12} sm={6} md={4} mt={4} style={{ marginTop: "2rem" }} key={index}>
      <Container className="home-cards" id="intro-card" style={{ gap: "7px" }}>
        <div className="home-cards__img">
          <img src={icon} alt="icône invités" />
        </div>
        <div className="home-cards__title">
          <h3>{title}</h3>
        </div>
        <div>
          <span>{description}</span>
        </div>
      </Container>
    </Col>
  );
};

export default Card;
