import React from 'react';
import { withRouter, Link } from "react-router-dom";
import flowers from "../../img/bouquet.png";
import groupIcon from "../../img/dashboardIcons/groupe.png";
import tableIcon from "../../img/dashboardIcons/dinner-table.png";
import menuIcon from "../../img/dashboardIcons/plate.png";
import todoIcon from "../../img/dashboardIcons/todo.png";
import calculatorIcon from "../../img/dashboardIcons/calculator.png";
import './Home.css';
import "../../components/LargeButton/LargeButton.css"

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
                    <div className="section-2___contenu">
                        <div className="home-cards__style">
                            <div className="home-cards">
                                <div className="home-cards__img">
                                    <img src={groupIcon} alt="icône invités"/>
                                </div>
                                <div className="home-cards__title">
                                    <h3>Les invités</h3>
                                </div>
                                <div>
                                    <span>Complétez et personnalisez votre liste d'invités</span>
                                </div>
                            </div>
                            <div className="home-cards">
                                <div className="home-cards__img">
                                    <img src={tableIcon} alt="icône tables"/>
                                </div>
                                <div className="home-cards__title">
                                    <h3>Les tables</h3>
                                </div>
                                <div>
                                    <span>Gérez les plans de table</span>
                                </div>
                            </div>
                            <div className="home-cards">
                                <div className="home-cards__img">
                                    <img src={menuIcon} alt="icône menu"/>
                                </div>
                                <div className="home-cards__title">
                                    <h3>Le menu</h3>
                                </div>
                                <div>
                                    <span>Vous avez prévu une réception ? Rédigez la carte du repas</span>
                                </div>
                            </div>
                            <div className="home-cards">
                                <div className="home-cards__img">
                                    <img src={todoIcon} alt="icône tâches"/>
                                </div>
                                <div className="home-cards__title">
                                    <h3>Les tâches</h3>
                                </div>
                                <div>
                                    <span>Gérer votre liste de tâches</span>
                                </div>
                            </div>
                            <div className="home-cards">
                                <div className="home-cards__img">
                                    <img src={calculatorIcon} alt="icône dépenses"/>
                                </div>
                                <div className="home-cards__title">
                                    <h3>Les dépenses</h3>
                                </div>
                                <div>
                                    <span>Tenez vos comptes grâce à votre carnet de dépenses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default withRouter(Home);
