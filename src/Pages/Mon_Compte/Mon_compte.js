import React, { useState, useEffect, useContext } from 'react';
import { UserContext, ScrollButtonContext } from "../../../src/App";
import Button from "../../../src/components/LargeButton/LargeButton";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import "./Mon_compte.css";

const MyAccount = ({ token }) => {
console.log("🚀 ~ file: Mon_compte.js ~ line 10 ~ MyAccount ~ props", token)
   
    const { id, mariageID } = useContext(UserContext)
    const scrollBtn = useContext(ScrollButtonContext)
    const [successfulDeletionMessage, setsuccessfulDeletionMessage] = useState("")
    
    const [account, setAccount] = useState({})
    const [wedding, setWedding] = useState({})
    const [deleteValidation, setdeleteValidation] = useState(false)
    
    // Fetch data
    useEffect(() => {
        let account = axios.get(`/api/admin/admin/myAccount/${id}`);
        let wedding = axios.get(`/api/admin/wedding/${mariageID}`);

        const fetchData = async () => {
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

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
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
        console.log(firstPerson, secondPerson);
        await axios.post(`/api/admin/wedding/edit/${mariageID}`,
            {
                firstPerson: firstPerson,
                secondPerson: secondPerson
            })
            .then((res) => {
                if(res.data != null){
                    wedding.firstPerson = firstPerson;
                    wedding.secondPerson = secondPerson;
                }
            })
            .catch((err) => {
                alert("Une erreur est survenue. Veuillez rééssayer plus tard.", JSON.stringify(err));
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
    
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, reset: updateAccountData } = useForm({
        mode: "onBlur",
        resolver: yupResolver(accountValidationSchema)
    });
    useEffect(() => {
        if (account) {
            updateAccountData(account)
        }
    }, [updateAccountData, account]);

    
    
      const onSubmitAccount = async ({ password }) => {
        await axios.post(`/api/admin/admin/editAccount/${id}`,
        {
            password: password
        })
        .then((res) => {
            if(res.data != null){
                setTimeout(() => {
                    alert('Le mot de passe a été mofidié avec succès.')
                    window.location.reload()
                }, 1000);
            }
        })
        .catch((err) => {
            alert("Une erreur est survenue. Veuillez rééssayer plus tard.", JSON.stringify(err));
            console.log(err)
        })
      };

    const deleteAccount = async () => {
        await axios.delete(`/api/admin/admin/deleteAccount/${id}`)
            .then(res => {
                if(res.data === 200){
                    setsuccessfulDeletionMessage(res.statusText)
                }
                console.log(res.data)
                console.log(res.status)
                console.log(res.statusText)
            })
            .then(() => {
                if(token){
                    localStorage.removeItem("token")
                    setTimeout(() => {
                        window.location.reload()
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
                <div className="account___title">
                    <div className="account___title_style">
                        <h1>Votre compte</h1>
                    </div>
                </div>
                <div className="row align-items-center account___form container">
                    <div className="col">
                        <form key={1} onSubmit={handleSubmit(onSubmitWedding)}>
                            <div className="account__row">
                                <div className={`textfield-style account___form-style`}>
                                    <label>Prénom de l'époux/épouse 1</label>
                                    <input
                                    name="firstPerson"
                                    type="text"
                                    {...register('firstPerson')}
                                    className="form-control"
                                    />
                                    <span>{errors.firstPerson?.message}</span>
                                </div>
                            </div>
                            <div className="account__row">
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
                            </div>
                            <input type="submit" />
                        </form>
                            <form key={2} onSubmit={handleSubmit2(onSubmitAccount)}>
                                <div className="account__row">
                                    <div className={`textfield-style account___form-style`}>
                                        <label>Email</label>
                                        <input
                                        {...register2('email')}
                                        disabled
                                        className="form-control"
                                        name="email"
                                        type="email"
                                        placeholder={account.email}
                                        />
                                    </div>
                                </div>
                                <div className="account__row">
                                    <div className={`textfield-style account___form-style`}>
                                        <label>Nouveau mot de passe</label>
                                        <input
                                        {...register2('password')}
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="account__row">
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
                                </div>
                                <div className="account___btn_container">
                                    <Button title="Enregistrer les changements" type="submit"/>
                                </div>
                        </form>
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
            <div><span>{successfulDeletionMessage}</span></div>
        </div>
    )
}

export default MyAccount
