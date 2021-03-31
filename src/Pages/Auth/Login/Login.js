import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Login.css";
import Button from "../../../components/LargeButton/LargeButton";
// import "../../../components/LargeButton/LargeButton.css";
import check from "../../../img/check.png";
import axios from "axios";

const Login = props => {
    const history = useHistory();
    
    const [admin, setAdmin] = useState({email: '', password: ''})

    const handleChange = (e) => {
        const {value, name} = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(admin)
        alert("submitted!")
        axios.post("/api/auth/adminLogin", admin)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    alert("Bienvenue.")
                    localStorage.setItem("token", res.data.token)
                    const token = localStorage.getItem('token')
                    console.log(token)
                    if(token){
                        setTimeout(() => {
                            window.location = "/menuAdm" ;
                            history.push("/menuAdm");
                        }, 1500);
                    }
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="demo">
                    <div className="login">
                        <div className="login__check">
                            <img alt="check" src={check}/>
                        </div>
                        <div className="login__form">
                            <form onSubmit={handleSubmit}>
                                <div className="login__row">
                                    <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                                    </svg>
                                    <input
                                    className="login__input"
                                    name="email"
                                    type="email"
                                    value={admin.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    autoComplete="email"
                                    />
                                </div>
                                <div className="login__row">
                                    <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                    </svg>
                                    <input
                                    className="login__input"
                                    name="password"
                                    type="password"
                                    value={admin.password}
                                    onChange={handleChange}
                                    placeholder="Mot de passe"
                                    autoComplete="current-password"
                                    />
                                </div>
                                <Button title="Se connecter"/>
                            </form>
                        </div>
                        <div className="login__signup">
                            <p>Pas encore membre? &nbsp;<Link to={"/register"}>Inscrivez-vous</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);