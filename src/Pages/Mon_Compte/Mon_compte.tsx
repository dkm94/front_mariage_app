import "./Mon_compte.css";

import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosResponse } from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { UserContext, ScrollButtonContext } from "../../App";
import Button from "../../components/LargeButton/LargeButton.js";
import { AccountType, UserType, WeddingType } from '../../../types';

const win: Window = window;

type FormValues = {
    firstPerson: string;
    secondPerson: string;
}

type FormValues2 = {
    password: string;
    confirmPassword: string;
}

const MyAccount = ({ token }) => {
   
    const user: UserType = useContext(UserContext);
    const { id, mariageID } = user as { id: string, mariageID: string };

    const scrollBtn = useContext(ScrollButtonContext)
    const [successfulDeletionMessage, setsuccessfulDeletionMessage] = useState<string>("")
        
    const [account, setAccount] = useState<AccountType | {}>({})
    const [wedding, setWedding] = useState<WeddingType | {}>({})
    const [deleteValidation, setdeleteValidation] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>("")
    const [editSuccess, setEditSuccess] = useState<string>("")

    const { email } = account as { email: string };
    
    // Fetch data
    useEffect(() => {
        let account: Promise<AxiosResponse> = axios.get<AccountType>(`/api/admin/admin/myAccount/${id}`);
        let wedding: Promise<AxiosResponse> = axios.get<WeddingType>(`/api/admin/wedding/${mariageID}`);

        const fetchData = async (): Promise<void> => {
            let res = await Promise.all([account, wedding])
            setAccount(res[0].data)
            setWedding(res[1].data)
        }
        fetchData()}, [id, mariageID])


    // Handle wedding Form
    const weddingValidationSchema = Yup.object().shape({
        firstPerson: Yup.string()
            .min(2, "Le prénom doit contenir au moins 2 caractères.")
            .max(30, "Le prénom ne peut contenir plus de 30 caractères.")
            .matches(
                /^[a-zA-Z\s]*$/,
                "Le prénom ne doit contenir que des lettres."
              ),
        secondPerson: Yup.string()
            .min(2, "Le prénom doit contenir au moins 2 caractères.")
            .max(30, "Le prénom ne peut contenir plus de 30 caractères.")
            .matches(
                /^[a-zA-Z\s]*$/,
                "Le prénom ne doit contenir que des lettres."
            ),
    })

    const { register, formState: { errors }, handleSubmit, reset } = useForm<FormValues>({
        mode: "onBlur",
        resolver: yupResolver(weddingValidationSchema)
      });

    // mount DefaultValues 
      useEffect(() => {
        if (wedding) {
            reset(wedding)
        }
    }, [reset, wedding]);

    const onSubmitWedding = async ({firstPerson, secondPerson}) => {
        await axios.post(`/api/admin/wedding/edit/${mariageID}`,
            {
                firstPerson: firstPerson,
                secondPerson: secondPerson
            })
            .then((res) => {
                if(res.data != null){
                    setEditSuccess("La modification a été enregistrée.");
                    setTimeout(() => {
                        setEditSuccess("")
                    }, 2500);
                }
            })
            .catch((err) => {
                //todo: handle with toast
                alert("Une erreur est survenue. Veuillez rééssayer.");
                console.log(err)
            })
      };



    // Handle account form
     const accountValidationSchema = Yup.object().shape({
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
    
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, reset: updateAccountData } = useForm<FormValues2>({
        mode: "onBlur",
        resolver: yupResolver(accountValidationSchema)
    });
    useEffect(() => {
        if (account) {
            updateAccountData(account)
        }
    }, [updateAccountData, account]);

    
    
      const onSubmitAccount = async () => {
        await axios.post(`/api/admin/admin/editAccount/${id}`,
        {
            password: newPassword
        })
        .then((res) => {
            if(res.data != null){
                setTimeout(() => {
                    setEditSuccess("La modification a été enregistrée.");
                    setNewPassword("");
                    window.location.reload()
                }, 1000);
            }
        })
        .catch((err) => {
                //todo: handle with toast

            alert("Une erreur est survenue. Veuillez rééssayer plus tard.");
            console.log(err)
        })
      };

    const deleteAccount = async () => {
        await axios.delete(`/api/admin/admin/deleteAccount/${id}`)
            .then(res => {
                if(res.data === 200){
                    setsuccessfulDeletionMessage(res.statusText)
                }
            })
            .then(() => {
                if(token){
                    localStorage.removeItem("token")
                    setTimeout(() => {
                        win.location = "/"
                    }, 2000);
                }
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
        <div className="account page-component">
            {scrollBtn}
            <div className="account___container">
                <div  className="account___bgimage" />
                <div className="titles mb-3">
                    <h1>Votre compte</h1>
                </div>
                <Container style={{ padding: "5rem 10rem" }} fluid>
                    <Row style={{ marginBottom: "8rem"}}>
                        <form className="wedding-form__style" key={1} onSubmit={handleSubmit(onSubmitWedding)}>
                            <Col xs={12} md={6} className="account__row">
                                <div className={`textfield-style account___form-style`}>
                                    <label>Prénom de l'époux/épouse 1</label>
                                    <input
                                    {...register('firstPerson')}
                                    name="firstPerson"
                                    type="text"
                                    className="form-control"
                                    />
                                    <span>{errors.firstPerson?.message}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="account__row">
                                <div className={`textfield-style account___form-style`}>
                                    <label>Prénom de l'époux/épouse 2</label>
                                    <input
                                    {...register('secondPerson')}
                                    type="text"
                                    name="secondPerson"
                                    className="form-control"
                                    />
                                    <span>{errors.secondPerson?.message}</span>
                                </div>
                            </Col>
                            <Col xs={12} style={{ display: "flex", justifyContent: "end"}}>
                                <Button type="submit" title="Enregistrer"/>
                            </Col>
                            {editSuccess}
                        </form>
                    </Row>
                </Container>
                <Container style={{ padding: "5rem 10rem" }} fluid>
                    <form className="account-form__style" key={2} onSubmit={handleSubmit2(onSubmitAccount)}>
                        <Row>
                            <Col xs={12} md={6} className="account__row">
                                <div className={`account___form-style textfield-style`}>
                                    <label>Email</label>
                                    <input
                                    // {...register2('email')}
                                    disabled
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    placeholder={email}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>

                            <Col xs={12} md={6} className="account__row">
                                <div className={`textfield-style account___form-style`}>
                                    <label>Nouveau mot de passe</label>
                                    <input
                                    {...register2('password')}
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="account__row">
                                <div className={`textfield-style account___form-style`}>
                                    <label>Confirmer le nouveau mot de passe</label>
                                    <input
                                    {...register2('confirmPassword')}
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    />
                                    <span>{errors2.confirmPassword?.message}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} style={{ display: "flex", justifyContent: "end"}} >
                                <div className="account___btn_container">
                                    <Button title="Enregistrer" type="submit"/>
                                </div>
                            </Col>
                            {editSuccess}
                        </Row>
                    </form>
                </Container>
                <Container style={{ padding: "5rem 10rem" }} fluid>
                    <Row>
                        <Col xs={12} md={8} id="delete-account___link">
                            <span onClick={() => setdeleteValidation(!deleteValidation)}>Supprimer le compte</span>
                            <div style={deleteValidation ? showButtons : hideButtons}>
                                <span>La suppression du compte étant définitive, toutes les données seront perdues. Souhaitez-vous continuer ?</span>
                                <button onClick={deleteAccount}>OUI</button>
                                <button type="submit" onClick={() => setdeleteValidation(!deleteValidation)}>NON</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div><span>{successfulDeletionMessage}</span></div>
        </div>
    )
}

export default MyAccount
