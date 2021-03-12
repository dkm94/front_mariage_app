import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Register.css";
import Button from "../../../components/LargeButton/LargeButton";
// import "../../../components/LargeButton/LargeButton.css";
import check from "../../../img/arobase.png";
import axios from "axios";

const Register = props => {
    const history = useHistory();
    
    const [newAdmin, setnewAdmin] = useState({email: '', password: ''})

    const handleChange = (e) => {
        const {value, name} = e.target;
        setnewAdmin(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newAdmin)
        alert("submitted!")
        axios.post("/api/auth/createAccount", newAdmin)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    alert("Votre compte a bien été créé. Veuillez vous connecter.")
                    setTimeout(() => {
                        window.location.reload();
                        history.push("/login");
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="demo">
                    <div className="register">
                        <div className="register__check">
                            <img alt="check" src={check}/>
                        </div>
                        <div className="register__form">
                            <form onSubmit={handleSubmit}>
                                <div className="register__row">
                                <svg className="register__icon name svg-icon" viewBox="0 0 20 20">
                                    <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                                </svg>
                                <input
                                className="register__input"
                                name="email"
                                type="email"
                                value={newAdmin.email}
                                onChange={handleChange}
                                placeholder="Email"
                                autoComplete="email"
                                />
                                </div>
                                <div className="register__row">
                                <svg className="register__icon pass svg-icon" viewBox="0 0 20 20">
                                    <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                </svg>
                                <input
                                className="register__input"
                                name="password"
                                type="password"
                                value={newAdmin.password}
                                onChange={handleChange}
                                placeholder="Mot de passe"
                                autoComplete="current-password"
                                />
                                </div>
                                <Button title="Se connecter"/>
                                <p className="register__signup">Déjà inscrit ? &nbsp;<Link to={"/login"}>Connectez-vous</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Register);