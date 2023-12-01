import { Link } from "react-router-dom";
import "./NotFound.css";
import React from "react";

const NotFount = () => {
  return (
    <div className="not-found">
      <div>
        <h1>404</h1>
        <h2>Oups, cette page est introuvable</h2>
        <div>
          <Link to="/">Retourner sur la page d'accueil</Link>
        </div>
      </div>
    </div>
  );
};
export default NotFount;
