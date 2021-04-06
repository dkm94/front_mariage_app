import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import Button from "../../../components/LargeButton/LargeButton";
// import "../../../components/LargeButton/LargeButton.css";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Cet email est invalide.')
            .required('Veuiller compléter ce champ.'),
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
  
    const formik = useFormik({
        initialValues: {
            email: '', 
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            await axios.post(`/api/auth/createAccount`,
            {
                email: values.email,
                password: values.password
            })
            .then((res) => {
                if(res.data != null){
                    // setnewAdmin(values)
                    setTimeout(() => {
                        alert('Votre compte a été créé avec succès. Vous allez être redirigé.e vers la page de connexion...')
                        window.location = "/login" ;
                    }, 1000);
                }
            })
        },
        validationSchema: validationSchema
    })
  
    

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="demo">
                    <div className="register">
                        <div className="register__check">
                            <span>Inscrivez-vous</span>
                        </div>
                        <div className="register__form">
                            <Formik>
                                <Form onSubmit={formik.handleSubmit}>
                                        <div className="register__row">
                                            <div className="register__row__icon">
                                                <svg className="register__icon name svg-icon" viewBox="0 0 20 20">
                                                    <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                                                </svg>
                                            </div>
                                            <div className={`textfield-style`}>
                                                <label>Email</label>
                                                <input
                                                className="register__input"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                {...formik.getFieldProps('email')}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                <div className="error">{formik.errors.email}</div>
                                            ) : null}
                                            </div>
                                        </div>
                                        <div className="register__row">
                                            <div className="register__row__icon">
                                                <svg className="register__icon pass svg-icon" viewBox="0 0 20 20">
                                                    <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                                </svg>
                                            </div>
                                            <div className={`textfield-style`}>
                                                <label>Mot de passe</label>
                                                <input
                                                className="register__input"
                                                name="password"
                                                type="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                {...formik.getFieldProps('password')}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="error">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                            
                                        </div>
                                        <div className="register__row">
                                            <div className="register__row__icon">
                                                <svg className="register__icon pass svg-icon" viewBox="0 0 20 20">
                                                    <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                                </svg>
                                            </div>
                                            <div className={`textfield-style`}>
                                                <label>Confirmer le mot de passe</label>
                                                <input
                                                className="register__input"
                                                name="confirmPassword"
                                                type="password"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                {...formik.getFieldProps('confirmPassword')}
                                                />
                                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                    <div className="error">{formik.errors.confirmPassword}</div>
                                                ) : null}
                                            </div>
                                            
                                        </div>
                                    <Button title="Créér mon compte" type="submit"/>
                                </Form>
                            </Formik>
                            
                       
                        </div>
                        <div className="register__signup">
                            <p>Déjà inscrit ? &nbsp;<Link to={"/login"}>Connectez-vous</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Register);