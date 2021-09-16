import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

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
                alert("Merci de vérifier vos identifiants ou de rééssayer plus tard.");
                // console.log(err)})
            })
      };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="demo">
                    <div className="login">
                        <div className="login__check">
                            <span>Connectez-vous</span>
                        </div>
                        <div className="login__form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>Email</label>
                                <input
                                    {...register('email', { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                                <div>{errors.email?.message}</div>
                                <label>Mot de passe</label>
                                <input 
                                    {...register('password', { required: true })}
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                                <div>{errors.password?.message}</div>
                                <input type="submit" />
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