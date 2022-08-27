import React from 'react';
import { withRouter, Link } from "react-router-dom";
import flowers from "../../img/bouquet.png";
import './Home.css';
import "../../components/LargeButton/LargeButton.css"
import { Container, Row } from 'react-bootstrap';
import Card from "./Card";
import dashboardCards from "./data";

const Home = () => {
    return (
        <div className="home">
            <div className="section-1">
                <div className="home___position">
                    <div className="home___position-style">
                        <div className="home-desc">
                            <h1>Simplifiez l'organisation de votre mariage</h1>
                            <div className="home__picture" id="hidden-picture">
                                <img src={flowers} alt="home page illustration flowers" />
                            </div>
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
                <div className="home__picture" id="show-home-picture">
                    <img src={flowers} alt="home page illustration flowers" />
                </div>
            </div>
            <div className="section-2">
                <div className="section-2___titre">
                    <h2>Comment ça fonctionne</h2>
                </div>
                <div className="section-2___sous-titre">
                    <span>Votre tableau de bord vous apporte une vue d'ensemble des éléments ajoutés aux différentes catégories.</span>
                </div>
                <Container>
                    <Row>
                        {dashboardCards.map((card, i) => {
                            return(
                                <Card
                                index={i}
                                icon={card.icon}
                                title={card.title}
                                description={card.description}
                            />
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default withRouter(Home);
