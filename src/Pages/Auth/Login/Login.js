import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorAlert from "../../../components/Alert/Error/Error";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import axios from "axios";
import cake from "../../../img/login-register/cake.jpeg";
import "./Login.css";

const Login = () => {
    const [showError, setShowError] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false)
    const history = useHistory();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Veuillez compléter ce champ.'),
        password: Yup.string()
            .required('Veuillez compléter ce champ.')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    const onSubmit = ({email, password}) => {
        setLoadingButton(true)
        axios.post(`/api/auth/adminLogin`,
        {
            email: email,
            password: password,
        })
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                    const token = localStorage.getItem('token')
                    if(token){
                        setTimeout(() => {
                            setLoadingButton(false)
                            window.location = "/tableau-de-bord" ;
                            history.push("/tableau-de-bord");
                        }, 500);
                    }
            })
            .catch((err) => {
                console.log(err)
                setShowError(true)
                setLoadingButton(false)
                setTimeout(() => {
                    setShowError(false)
                }, 5000);
            })
      };

    return (
        <div className="login-page">
            <ErrorAlert showError={showError} title="Oups, une erreur est survenue" description="Veuillez réessayer plus tard" />
            <div className="login-grid">
                <div className="grid-item-1">
                    <img 
                        alt="login img" 
                        src={cake}
                    />
                </div>
                <div className="grid-item-2 center-x">
                    <div className="login">
                        <div className="form-group">
                            <h1>Connectez-vous</h1>
                        </div>
                        <div className="login__form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        {...register('email', { required: true })}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control shadow-none"
                                        style={{ borderColor: "#D1D4D5"}}
                                    />
                                    <div>{errors.email?.message}</div>
                                </div>
                                <div className="form-group">
                                    <label>Mot de passe</label>
                                    <input 
                                        {...register('password', { required: true })}
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control shadow-none"
                                        style={{ borderColor: "#D1D4D5"}}
                                    />
                                    <div>{errors.password?.message}</div>
                                </div>
                                <div className="login__submit">
                                    <input type="submit" value={loadingButton ? "Veuillez patienter..." : "Se connecter"} />
                                </div>
                                <div className="login__signup">
                                    <p>Pas encore membre? &nbsp;<Link to={"/register"}>Inscrivez-vous</Link></p>
                                    {/* <p className="forgotten-password"><Link to={"/reset-password"}>Mot de passe oublié ?</Link></p> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);