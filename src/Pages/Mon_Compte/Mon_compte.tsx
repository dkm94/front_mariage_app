import "./Mon_compte.css";

import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosResponse } from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useFetch } from "../../hooks";
import { getWedding } from "../../services";
import { AccountType, UserType, WeddingType } from '../../../types';

import { UserContext, ScrollButtonContext } from "../../App";
import { BlackButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/Default/DefaultModal";

import profilePicture from "../../img/couple-img.jpg";
import changePwdIcon from "../../img/change-password-icon.png";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";

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
    const { id, mariageID, firstPerson, secondPerson } = user as { id: string, mariageID: string, firstPerson: string, secondPerson: string};

    const [successfulDeletionMessage, setsuccessfulDeletionMessage] = useState<string>("")
        
    const [account, setAccount] = useState<AccountType | {}>({})
    const [newPassword, setNewPassword] = useState<string>("")
    const [editSuccess, setEditSuccess] = useState<string>("")

    const [openModal, setOpenModal] = useState<boolean>(false);

    const { email } = account as { email: string };

    const { data: wedding, fetchData: fetchWedding, loading } = useFetch<any, WeddingType>(() => getWedding({ id: mariageID }), undefined);

    // Fetch data
    useEffect(() => {
        let account: Promise<AxiosResponse> = axios.get<AccountType>(`/api/admin/admin/myAccount/${id}`);

        const fetchData = async (): Promise<void> => {
            let res = await Promise.all([account, wedding])
            setAccount(res[0].data)
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
        resolver: yupResolver(weddingValidationSchema),
        defaultValues: {
            firstPerson,
            secondPerson
        }
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

    return (
        <ContentLayout loading={loading} title={"Paramètres du compte"} src={"account"} >
            <div style={{ padding: "2rem 50px", display: "flex", flexDirection: "column", gap: "30px" }}>
                <Container className="account-container" fluid>
                    <Row>
                        <Col className="settings-img-container">
                            <div>
                                <img 
                                alt="profile" 
                                src={profilePicture}
                                />
                            </div>
                        </Col>
                        <Col className="settings-content-container">
                            <form className="wedding-form__style" key={1} onSubmit={handleSubmit(onSubmitWedding)}>
                                <Col className="account__row">
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
                                <Col  className="account__row">
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
                                    <BlackButton 
                                        type="submit" 
                                        text={"Enregistrer"} 
                                        variant="contained"
                                        sx={{ "&:hover": { backgroundColor: "#333232" } }}
                                        style={{ borderRadius: "20px", padding: "6px 16px"}}/>
                                </Col>
                                {editSuccess}
                            </form>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="account-container">
                    <Row>
                        <Col className="settings-img-container">
                                <div>
                                    <img src={changePwdIcon} alt="change password icon" />
                                </div>
                        </Col>
                        <Col className="settings-content-container">
                            <form className="account-form__style" key={2} onSubmit={handleSubmit2(onSubmitAccount)}>
                                <Col  className="account__row">
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

                                <Col className="account__row">
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
                                <Col className="account__row">
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
                                <Col xs={12} style={{ display: "flex", justifyContent: "end"}} >
                                    <BlackButton 
                                        type="submit" 
                                        text={"Enregistrer"} 
                                        variant="contained"
                                        sx={{ "&:hover": { backgroundColor: "#333232" } }}
                                        style={{ borderRadius: "20px", padding: "6px 16px" }}
                                    />
                                </Col>
                                {editSuccess}
                            </form>
                        </Col>
                    </Row>
                </Container>
                <Container fluid style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "50px", maxWidth: "950px" }}>
                    <BlackButton text="Supprimer le compte" onClick={() => setOpenModal(true)} style={{ backgroundColor: "darkred", borderRadius: "5px" }} />
                </Container>
            </div>
            {openModal && (
                <DefaultModal title="Supprimer votre compte" setOpen={() => setOpenModal(false)}>
                    <div id="modal-account">
                        <span>La suppression du compte étant définitive, toutes les données seront perdues. Souhaitez-vous continuer ?</span>
                        <div className="action-buttons">
                            <BlackButton
                            onClick={deleteAccount}
                            text={"Supprimer"}
                            variant="contained"
                            style={{ borderRadius: "20px", padding: "6px 16px", flexGrow: 1, color: "#F4F4F4", backgroundColor: "darkred" }}
                            />
                            <BlackButton
                            onClick={() => setOpenModal(false)}
                            text={"Annuler"}
                            type={"submit"}
                            variant="contained"
                            style={{ 
                            color: "grey",
                            border: "#e4e8e8 1px solid",
                            borderRadius: "20px", 
                            padding: "6px 16px",
                            backgroundColor: "unset",
                            boxShadow: "unset",
                            flexGrow: 1 }}
                            />
                        </div>
                    </div>
                </DefaultModal>
            )}
            <div><span>{successfulDeletionMessage}</span></div>
        </ContentLayout>
    )
}


export default MyAccount
