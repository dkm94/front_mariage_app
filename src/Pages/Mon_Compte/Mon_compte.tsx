import "./Mon_compte.css";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useFetch } from "../../hooks";
import { deleteAccount, getUser, updatePassword, getWedding, updateWedding } from "../../services";
import { useCurrentUser } from "../../ctx/userCtx";
import { AccountType, UserType, WeddingType } from '../../../types';

import { ClearButton, CustomButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";

import profilePicture from "../../img/couple-img.jpg";
import changePwdIcon from "../../img/change-password-icon.png";
import { Divider } from "@mui/material";

const win: Window = window;

type FormValues = {
    firstPerson: string;
    secondPerson: string;
}

type FormValues2 = {
    password: string;
    confirmPassword: string;
}

interface AccountProps {
    token: string;
}

const MyAccount = (props: AccountProps) => {
    const user: UserType = useCurrentUser();
    const { id, mariageID, firstPerson, secondPerson, email } = user as { id: string, mariageID: string, firstPerson: string, secondPerson: string, email: string};
    console.log("🚀 ~ MyAccount ~ email:", email)
    console.log("🚀 ~ MyAccount ~ id:", id)

    const [newPassword, setNewPassword] = useState<string>("")

    const [openModal, setOpenModal] = useState<boolean>(false);

    const { 
        data: wedding, 
        loading,
        message: messageWedding,
        messageType: messageTypeWedding,
        setMessage: setMessageWedding,
        setMessageType: setMessageTypeWedding
    } = useFetch<any, WeddingType>(() => getWedding({ id: mariageID }), undefined);


    const {
        data: account,
        message: messageAccount,
        messageType: messageTypeAccount,
        setMessage: setMessageAccount,
        setMessageType: setMessageTypeAccount
    } = useFetch<any, AccountType>(() => getUser({ id }), undefined);

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
        const response = await updateWedding({ id: mariageID, firstPerson, secondPerson });
        const { success, message } = response;

        if(!success){
            setMessageTypeWedding("error")
            setMessageWedding(message)
            return;
        }

        if(success && message){
            setMessageTypeWedding("success")
            setMessageWedding(message)
        }
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

    // handle edit account
    
    const onSubmitAccount = async () => {
        const response = await updatePassword({ id, password: newPassword })
        const { success, message } = response; 
        
        if(!success){
            setMessageTypeAccount("error")
            setMessageAccount(message)
        }

        if(success && message){
            setMessageTypeAccount("success")
            setMessageAccount(message)
        }
        setTimeout(() => {
            setNewPassword("");
            window.location.reload()
        }, 1000);
    };

    const deleteAccountFn = async () => {
        const response = await deleteAccount({ id });
        const { success, message, statusCode } = response;

        if(!success){
            setMessageTypeAccount("error")
            setMessageAccount(message)
            return;
        }

        if(success && statusCode === 200 && message){
            setMessageTypeAccount("success");
            setMessageAccount(message);
        }

        if(statusCode === 200){
            setTimeout(() => {
                localStorage.removeItem("token")
                win.location = "/"
                // win.location.reload();
            }, 5000);
        }
    }

    const handleCancel = () => {
        setOpenModal(false);
    }

    return (
        <ContentLayout 
        loading={loading} 
        title={"Paramètres du compte"} 
        src={"account"} 
        message={messageWedding || messageAccount} 
        messageType={messageTypeWedding || messageTypeAccount}
        id={id || ""}
        >
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div className="settings-container">
                    <Container className="account-container" fluid>
                        <h3 className="settings-title">Modifier le profil</h3>
                        <Row>
                            <Col className="settings-img-container">
                                <div>
                                    <img 
                                    alt="profile" 
                                    src={profilePicture}
                                    id="settings-img-profile"
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
                                        <CustomButton 
                                            type="submit" 
                                            text={"Enregistrer"} 
                                            variant="contained"
                                            sx={{ "&:hover": { backgroundColor: "#333232" } }}
                                            style={{ borderRadius: "20px", padding: "6px 16px"}}/>
                                    </Col>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                    <Divider id="settings-divider" />
                    <Container fluid className="account-container">
                        <h3 className="settings-title">Modifier le mot de passe</h3>
                        <Row>
                            <Col className="settings-img-container">
                                    <div>
                                        <img src={changePwdIcon} alt="change password icon" id="settings-img-lock" />
                                    </div>
                            </Col>
                            <Col className="settings-content-container">
                                <form className="account-form__style" key={2} onSubmit={handleSubmit2(onSubmitAccount)}>
                                    <Col  className="account__row">
                                        <div className={`account___form-style textfield-style`}>
                                            <label>Email</label>
                                            <input
                                            value={account?.email}
                                            disabled
                                            className="form-control"
                                            name="email"
                                            type="email"
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
                                        <CustomButton 
                                            type="submit" 
                                            text={"Enregistrer"} 
                                            variant="contained"
                                            sx={{ "&:hover": { backgroundColor: "#333232" } }}
                                            style={{ borderRadius: "20px", padding: "6px 16px" }}
                                        />
                                    </Col>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "50px", maxWidth: "950px" }}>
                        {/* TODO: Checker le mail test et renvoyer un message d'erreur au besoin (ajouter une fonction côté backend) */}
                        <CustomButton text="Supprimer le compte" backgroundColor="darkred" onClick={() => setOpenModal(true)} style={{ borderRadius: "5px" }} />
                    </Container>
                </div>
                {openModal && (
                    <DefaultModal title="Supprimer votre compte" setOpen={() => setOpenModal(false)}>
                        <div id="modal-account">
                        
                            {id === "660832cdb68f18004dd08896" ? (
                                <>
                                    <span style={{ textAlign: "center"}}>Vous ne pouvez pas supprimer le compte test.</span>
                                    <ClearButton
                                    text={"Annuler"}     
                                    onClick={handleCancel}
                                    />
                                </>
                            ) : (
                                <>
                                    <span>La suppression du compte étant définitive, toutes les données seront perdues. Souhaitez-vous continuer ?</span>
                                        <div className="action-buttons">
                                            <CustomButton
                                            onClick={deleteAccountFn}
                                            text={"Supprimer"}
                                            variant="contained"
                                            style={{ borderRadius: "20px", padding: "6px 16px", flexGrow: 1, color: "#F4F4F4", backgroundColor: "darkred" }}
                                            />
                                            <CustomButton
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
                                    </>
                                )
                            }
                        </div>
                    </DefaultModal>
                )}
            </div>
        </ContentLayout>
    )
}


export default MyAccount
