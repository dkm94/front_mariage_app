import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import Button from "../../../components/LargeButton/LargeButton";
// import "../../../components/LargeButton/LargeButton.css";
import check from "../../../img/arobase.png";
import { Formik, Form } from "formik";
import TextField from "../../../components/Formik/Texfiled-auth";
import * as Yup from "yup";
import axios from "axios";

const Register = props => {
    // const history = useHistory();
    
    // const [newAdmin, setnewAdmin] = useState({email: '', password: ''})

    // const handleChange = (e) => {
    //     const {value, name} = e.target;
    //     setnewAdmin(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(newAdmin)
    //     alert("submitted!")
    //     axios.post("/api/auth/createAccount", newAdmin)
    //         .then((res) => {
    //             console.log(res.data)
    //             if(res.data != null){
    //                 alert("Votre compte a bien été créé. Veuillez vous connecter.")
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                     history.push("/login");
    //                 }, 1500);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)})
    // }

    const newAdminValues = {
        email: '', 
        password: '',
        confirmPassword: ''
    }
    const [newAdmin, setnewAdmin] = useState(newAdminValues)
    const [toLogin, settoLogin] = useState(false)

    const initialValues = {
        email: newAdmin.email, 
        password: newAdmin.password, 
        confirmPassword: newAdmin.confirmPassword,
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Cet email est invalide.')
            .required('Veuiller compléter ce champ.'),
        password: Yup.string()
            .required('Veuiller compléter ce champ.')
            .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
            .max(5, 'Le mot de passe ne peut contenir plus de 50 caractères.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'La confirmation du mot de passe doit correspondre au mot de passe saisi précédemment.')
            .required('Veuiller compléter ce champ.')
    })


    return (
        <div className="register-page">
            <div className="register-container">
                <div className="demo">
                    <div className="register">
                        <div className="register__check">
                            <img alt="check" src={check}/>
                        </div>
                        <div className="register__form">
                            {/* <form onSubmit={handleSubmit}>
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
                                <Button title="Créér mon compte"/>
                            </form> */}
                         

                                <Formik
                                    validateOnChange={true}
                                    initialValues={initialValues}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        await axios.post(`/api/auth/createAccount`,
                                        {
                                            email: values.email,
                                            password: values.password
                                        })
                                            .then((res) => {
                                                alert(res)
                                                if(res.data != null){
                                                    alert("Votre compte a bien été créé, veuiller vous connecter.")
                                                    // setSubmitting(true);
                                                    setTimeout(() => {
                                                        alert(JSON.stringify(values, null, 2));
                                                        setSubmitting(false);
                                                        // settoLogin(true)
                                                        // {toLogin ? <Redirect to="/login"/> : null}
                                                    }, 2000);
                                                }
                                            })
                                            .catch((err) => {
                                                alert(err);
                                                console.log(err)})
                                                
                                    }}
                                >

                                {({ values, handleChange, isSubmitting, handleBlur, handleSubmit }) => {
                                    return(
                                      
                                            <Form onSubmit={() => handleSubmit(values)}>
                                                <div className="register__row">
                                                    <svg className="register__icon name svg-icon" viewBox="0 0 20 20">
                                                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                                                    </svg>
                                                    <TextField 
                                                    size="floatingInput"
                                                    label="Email"
                                                    // className="form-control" 
                                                    className="register__input"
                                                    name="email"
                                                    type="email"
                                                    value={values.email}
                                                    placeholder="name@example.com"
                                                    // autoComplete="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div className="register__row">
                                                    <svg className="register__icon pass svg-icon" viewBox="0 0 20 20">
                                                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                                    </svg>
                                                    <TextField 
                                                    size="floatingInput"
                                                    label="Mot de passe"
                                                    // className="form-control" 
                                                    className="register__input"
                                                    name="password"
                                                    type="password"
                                                    value={values.password}
                                                    autoComplete="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div className="register__row">
                                                    <svg className="register__icon pass svg-icon" viewBox="0 0 20 20">
                                                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                                    </svg>
                                                    <TextField 
                                                    size="floatingInput"
                                                    label="Confirmer le mot de passe"
                                                    // className="form-control"
                                                    className="register__input" 
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={values.confirmPassword}
                                                    // autoComplete="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    />
                                                </div>
                                                    
                                                    
                                                <div className="center-x">
                                                    <Button title="Valider" disabled={isSubmitting}/>
                                                </div>
                                            </Form>
                                       
                                    )
                                }}
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