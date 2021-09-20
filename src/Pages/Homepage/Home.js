import React from 'react';
import { withRouter, Link, Route, Redirect } from "react-router-dom";
import './Home.css';
import "../../components/LargeButton/LargeButton.css"

const Home = (props) => {
    console.log("Home: ",props)
        return (
            <div className="home">
                <div className="home___position">
                    <div className="home-desc">
                        <h1>Votre mariage à portée de main</h1>
                        <span>Consultez et organisez facilement les étapes clés de votre mariage en quelques clics</span>
                    </div>
                    <div className="home___register-btn">
                        <Link to={"/register"} className="home-link btn-style">
                        Inscrivez-vous dès maintenant
                        </Link>
                    </div>
                </div>
            </div>
        )
}

export default withRouter(Home);
