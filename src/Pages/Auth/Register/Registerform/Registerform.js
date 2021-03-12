import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Button from "../../../../components/LargeButton/LargeButton";
import "../../../../components/LargeButton/LargeButton.css";
import axios from "axios";

const Register = () => {
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
                    alert("Votre compte a bien été créé. Veuiller vous connecter.")
                    history.push("/register");
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div>

            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <div className="reg-input input-mail form-floating mb-3">
                    <label htmlFor="floatingInput">Adresse mail</label>
                    <input
                    id="floatingInput"
                    className="form-control" 
                    name="email"
                    type="email"
                    value={newAdmin.email}
                    placeholder="name@example.com"
                    autoComplete="email"
                    onChange={handleChange}
                    />
                </div>
                <div className="reg-input input-password form-floating">
                    <label>Mot de passe</label>
                    <input
                    className="form-control" 
                    id="floatingPassword"
                    name="password"
                    type="password"
                    value={newAdmin.password}
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    />
                </div>
                <div className="center-x">
                    <Button title="Valider"/>
                </div>
            </form>

        </div>
    )
}

export default withRouter(Register)
