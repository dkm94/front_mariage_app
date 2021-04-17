import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import Button from "../../../components/LargeButton/LargeButton";
// import "../../../components/LargeButton/LargeButton.css";
import axios from "axios";
import { Formik, Form } from "formik";
import TextField from "../../../components/Formik/Texfiled-auth";
import * as Yup from "yup";

const Login = () => {
    // const history = useHistory();
    
    const adminValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Veuillez compléter ce champ.'),
        password: Yup.string()
            .required('Veuillez compléter ce champ.')
    })

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="demo">
                    <div className="login">
                        <div className="login__check">
                            {/* <img alt="check" src={check}/> */}
                            <span>Connectez-vous</span>
                        </div>
                        <div className="login__form">
                            <Formik
                                validateOnChange={true}
                                initialValues={adminValues}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    // e.preventDefault()
                                    await axios.post(`/api/auth/adminLogin`,
                                    {
                                        email: values.email,
                                        password: values.password,
                                    })
                                        .then((res) => {
                                            if(res.data != null){
                                                setSubmitting(true);
                                                localStorage.setItem("token", res.data.token)
                                                const token = localStorage.getItem('token')
                                                if(token){
                                                    setTimeout(() => {
                                                        // history.push("/menuAdm");
                                                        // alert(JSON.stringify(values, null, 2));
                                                        window.location = "/menuAdm" ;
                                                        setSubmitting(false);
                                                    }, 1000);
                                                }
                                            }
                                        })
                                        .catch((err) => {
                                            // alert(err);
                                            console.log(err)})
                                            
                                }}
                            >
                                {({ values, handleChange, isSubmitting, handleBlur, handleSubmit }) => {
                                    return(
                                        <Form onSubmit={(e) => {e.preventDefault(); handleSubmit(values)}}>
                                            <div className="login__row">
                                                <div className="login__row__icon">
                                                    <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                                                        <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
                                                    </svg>
                                                </div>
                                                <TextField
                                                id="login__input"
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                // placeholder="Email"
                                                autoComplete="email"
                                                />
                                            </div>
                                            <div className="login__row">
                                                <div className="login__row__icon">
                                                    <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                                                        <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
                                                    </svg>
                                                </div>
                                                <TextField
                                                id="login__input"
                                                label="Mot de passe"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                // placeholder="Mot de passe"
                                                autoComplete="current-password"
                                                />
                                            </div>
                                            <div className="center-x">
                                                <Button title="Se connecter" disabled={isSubmitting}/>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
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