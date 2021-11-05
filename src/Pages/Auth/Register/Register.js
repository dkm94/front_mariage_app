import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import "./Register.css";
import flowers from "../../../img/login-register/flowers.jpeg";

const Register = () => {

    let tempArr = [];
    const [showAlert, setShowAlert] = useState(false)
   
    const validationSchema = Yup.object().shape({
        checkEmail: Yup.boolean(),
        email: Yup.string()
            .email('Cet email est invalide.')
            .required('Veuiller compléter ce champ.')
            .test('checkEmail', 'Cet utilisateur existe déjà.', (value) => !tempArr.includes(value)),
        password: Yup.string()
            .required('Veuiller compléter ce champ.')
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial."
              ),
        firstPerson: Yup.string()
            .required('Veuiller compléter ce champ.')
            .min(1, 'Le nom doit au moins contenir 1 caractère.')
            .max(50, 'Le nom ne peut comporter plus de 50 caractères.'),
        secondPerson: Yup.string()
            .required('Veuiller compléter ce champ.')
            .min(1, 'Le nom doit au moins contenir 1 caractère.')
            .max(50, 'Le nom ne peut comporter plus de 50 caractères.')
        ,
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
                .then(emailArr => {
                    emailArr.forEach(email => {
                        tempArr.push(email.email)
                    })
                })
                .catch(err => console.log(err))
        }
        fetchData();
    })

    const onSubmit = async ({firstPerson, secondPerson, email, password}) => {
        console.log(tempArr)
        await axios.post(`/api/auth/createAccount`,
            {
                firstPerson: firstPerson,
                secondPerson: secondPerson,
                email: email,
                password: password  
            })
            .then((res) => {
                setShowAlert(true)
                tempArr = []
                setTimeout(() => {
                    setShowAlert(false)
                    window.location = "/login" ;
                },4500);
            })
            .catch((err) => {
                alert("Une erreur est survenue. Veuillez rééssayer plus tard.", JSON.stringify(err));
                console.log(err)
            })
    };

    return (
        <div className="register-page">
            <div style={{ display: showAlert ? "block" : "none" }} className="register-alert fade-in" >
                <Alert severity="success">
                    <AlertTitle>Compte créé avec succès</AlertTitle>
                    Vous allez être redirigé vers la page de connexion...
                </Alert>
            </div>
            <div className="register-grid">
                <div className="grid-item-1">
                    <img alt="couple img" src={flowers} />
                </div>
                <div className="grid-item-2">
                    <div className="register">
                        <div className="form-group">
                            <h1>Inscrivez-vous</h1>
                        </div>
                        <div className="register__form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Prénom 1</label>
                                    <input
                                        {...register('firstPerson', { required: true })}
                                        id="firstPerson"
                                        name="firstPerson"
                                        type="text"
                                        className="form-control shadow-none"
                                        style={{ borderColor: "#D1D4D5"}}
                                    />
                                    <span>{errors.firstPerson?.message}</span>
                                </div>
                                <div className="form-group">
                                    <label>Prénom 2</label>
                                    <input
                                        {...register('secondPerson', { required: true })}
                                        id="secondPerson"
                                        name="secondPerson"
                                        type="text"
                                        className="form-control shadow-none"
                                        style={{ borderColor: "#D1D4D5"}}
                                    />
                                    <span>{errors.secondPerson?.message}</span>
                                </div>
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
                                <div className="form-group">
                                    <input type="submit" />
                                </div>
                                <div className="register__signup">
                                    <p>Déjà inscrit ? &nbsp;<Link to={"/login"}>Connectez-vous</Link></p>
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