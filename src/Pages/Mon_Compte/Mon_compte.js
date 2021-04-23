import React, { useState, useEffect } from 'react';
import { Formik, useFormik, Form } from "formik";
import Button from "../../../src/components/LargeButton/LargeButton";
import * as Yup from "yup";
import axios from "axios";
import "./Mon_compte.css";

const MyAccount = ({ userInfos }) => {

    const userId = userInfos.id;

    const [account, setaccount] = useState({})
    const [deleteValidation, setdeleteValidation] = useState(false)
    console.log(deleteValidation)
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/admin/admin/myAccount/${userId}`, {withCredentials: true})
                .then(res => {
                    setaccount(res.data)
                })
                .catch(err => console.log(err))
        }
        fetchData()}, [userId])

    const validationSchema = Yup.object().shape({
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
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            await axios.post(`/api/admin/admin/editAccount/${userId}`,
            {
                password: values.password
            })
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        alert('Le mot de passe a été modifié.')
                    }, 1000);
                }
            })
        },
        validationSchema: validationSchema
    })

    const deleteAccount = async () => {
        await axios.delete(`/api/admin/admin/deleteAccount/${userId}`)
            .then(res => {
                // if(res.data === 200){
                //     localStorage.removeItem("token")
                //     window.location.reload()
                // }
                console.log(res.data)
                console.log(res.status)
                console.log(res.statusText)
            })
            .catch(err => console.log(err))
    }

    const hideButtons = {
        display: 'none'
    }

    const showButtons = {
        display: "block"
    }

    return (
        <div className="account">
            <div className="row align-items-center account___container container">
                <div className="col account___title">
                    <h1>Mon compte</h1>
                </div>
                <div className="col account___form">
                    <Formik>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="account__row">
                                <div className={`textfield-style`}>
                                    <label>Email</label>
                                    <input
                                    disabled
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    value={account.email ||''}
                                    />
                                </div>
                                
                            </div>
                            <div className="account__row">
                                <div className={`textfield-style`}>
                                    <label>Nouveau mot de passe</label>
                                    <input
                                    className="form-control"
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
                            <div className="account__row">
                                <div className={`textfield-style`}>
                                    <label>Confirmer le nouveau mot de passe</label>
                                    <input
                                    className="form-control"
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
                            <div className="account___btn_container">
                                <Button title="Enregistrer les changements" type="submit"/>
                            </div>
                        </Form>
                    </Formik>
                    <div className="account__row" id="delete-account___link">
                        <span onClick={() => setdeleteValidation(!deleteValidation)}>Supprimer le compte</span>
                        <div style={deleteValidation ? showButtons : hideButtons}>
                            <span>La suppression du compte étant définitive, toutes les données seront perdues. Souhaitez-vous continuer ?</span>
                            <button onClick={deleteAccount}>OUI</button>
                            <button type="submit" onClick={() => setdeleteValidation(!deleteValidation)}>NON</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
