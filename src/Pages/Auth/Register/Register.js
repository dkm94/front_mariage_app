import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import "./Register.css";
import couple from "../../../img/couple2.jpg";

const Register = () => {

    const [emails, setEmails] = useState([])
    // let emails ;
   
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Cet email est invalide.')
            .required('Veuiller compléter ce champ.')
            .notOneOf(emails, 'Cet utilisateur existe déjà.'),
        password: Yup.string()
            .required('Veuiller compléter ce champ.')
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial."
              ),
        confirmPassword: Yup.string()
            .when("password", {
                is: password => (password && password.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref("password")], "La confirmation du mot de passe doit correspondre au mot de passe saisi précédemment.")
              })
            .required('Veuiller compléter ce champ.')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    
    

    useEffect(() => {
        const fetchData = async () => {
            const myHeaders = new Headers();
            const myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors'};
            await fetch(`https://backend-mywedding-app.herokuapp.com/api/admin/admin/`, myInit)
                .then(res => res.json())
                .then(data => {
                    setEmails(data)
                    // emails.push(data);
                })
                .catch(err => console.log(err))
        }
        fetchData();
    }, [emails])

    const onSubmit = async ({email, password}) => {
        await axios.post(`/api/auth/createAccount`,
            {
                email:email,
                password: password
            })
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        alert('Votre compte a été créé avec succès. Vous allez être redirigé.e vers la page de connexion...')
                        window.location = "/login" ;
                    }, 1000);
                }
            })
            .catch((err) => {
                alert("Une erreur est survenue. Veuillez rééssayer plus tard.", JSON.stringify(err));
                console.log(err)
            })
    };

    return (
        <div className="register-page">
            <div className="register-grid">
                <div className="grid-item-1">
                    <img alt="couple img" src={couple} />
                </div>
                <div className="grid-item-2 center-x">
                    <div className="register">
                        <div className="form-group">
                            <span>Inscrivez-vous</span>
                        </div>
                        <div className="register__form">
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
                                    <span>{errors.email?.message}</span>
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
                                    <span>{errors.password?.message}</span>
                                </div>
                                <div className="form-group">
                                    <label>Confirmer le mot de passe</label>
                                    <input 
                                        {...register('confirmPassword', { required: true })}
                                        id="password"
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control shadow-none"
                                        style={{ borderColor: "#D1D4D5"}}
                                    />
                                    <span>{errors.confirmPassword?.message}</span>
                                </div>
                                <div className="register__signup">
                                    <p>Déjà inscrit ? &nbsp;<Link to={"/login"}>Connectez-vous</Link></p>
                                </div>
                                <div className="form-group">
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

export default withRouter(Register);