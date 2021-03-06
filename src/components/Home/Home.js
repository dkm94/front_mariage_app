import React from 'react';
import { withRouter, Link } from "react-router-dom";
import './Home.css';
import "../LargeButton/LargeButton.css"

const Home = () => {

    // function handleRedirection(e){
    //     e.preventDefault();
    //     alert("clicked!")
    // }

        return (
            <div className="home">
                    <div className="home-desc">
                        <h1>Votre mariage à portée de main</h1>
                        <span>Consultez et organisez facilement les étapes clés de votre mariage en quelques clics</span>
                    </div>
                    <Link to={"/register"} className="home-link btn-style">
                    Inscrivez-vous dès maintenant
                    </Link>
            </div>
        )
}

export default withRouter(Home);
