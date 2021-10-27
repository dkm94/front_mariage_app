import React from 'react';
import { withRouter, Link } from "react-router-dom";
import flowers from "../../img/bouquet.png"
import './Home.css';
import "../../components/LargeButton/LargeButton.css"

const Home = () => {
        return (
            <div className="home">
                <div className="home___position">
                    <div className="home___position-style">
                        <div className="home-desc">
                            <h1>Simplifiez l'organisation de votre mariage</h1>
                            <p>
                                <span>Consultez et gérez facilement les étapes clés de votre mariage en quelques clics.</span>
                                <span>My Wedding, l'outil indispensable pour ne rien oublier des préparatifs de l'un des plus beaux évènements de votre vie.</span>
                            </p>
                        </div>
                        <div className="home___register-btn">
                            <Link to={"/register"} className="home-link btn-style">
                            Inscrivez-vous dès maintenant
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="home__picture">
                    <img src={flowers} alt="home page illustration flowers" />
                </div>
            </div>
        )
}

export default withRouter(Home);
