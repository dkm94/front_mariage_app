import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import couple from "../../../img/couple.jpg";

const Login = () => {
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
        axios.post(`/api/auth/adminLogin`,
        {
            email: email,
            password: password,
        })
            .then((res) => {
                if(res.data != null){
                    localStorage.setItem("token", res.data.token)
                    const token = localStorage.getItem('token')
                    if(token){
                        setTimeout(() => {
                            window.location = "/tableau-de-bord" ;
                            history.push("/tableau-de-bord");
                        }, 500);
                    }
                }
            })
            .catch((err) => {
                alert("Merci de vérifier vos identifiants ou de rééssayer plus tard.", JSON.strigify(err));
                // console.log(err)})
            })
      };

    return (
        <div className="login-page">
            <div className="login-grid">
                <div className="grid-item-1">
                    <img 
                        alt="login img" 
                        src={couple}
                    />
                </div>
                <div className="grid-item-2 center-x">
                    <div className="login">
                        <div className="form-group">
                            <span>Connectez-vous</span>
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
                                <div className="login__signup">
                                    <p>Pas encore membre? &nbsp;<Link to={"/register"}>Inscrivez-vous</Link></p>
                                </div>
                                <div>
                                    <input type="submit" />
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