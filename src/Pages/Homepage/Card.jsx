import "./Home.css";

import React from "react";

const Card = ({ index, icon, title, description }) => {
  return (
      <div key={index} className="home-cards intro-card">
        <div className="home-cards__img">
          <span className="material-symbols-outlined">{icon}</span>
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
