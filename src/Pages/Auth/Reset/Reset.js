import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import axios from "axios";
import "./Reset.css";

const Reset = () => {
    // const history = useHistory();
    const [emails, setEmails] = useState([])
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Veuillez compléter ce champ.')
            .notOneOf(emails, 'Cet utilisateur n\'existe pas.')
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
            await fetch(`https://my-wedding-backend.onrender.com/api/admin/admin/`, myInit)
                .then(res => res.json())
                .then(data => {
                    setEmails(data)
                    // emails.push(data);
                })
                .catch(err => console.log(err))
        }
        fetchData();
    }, [emails])
    
    const onSubmit = async ({email}) => {
        await axios.post(`/api/auth/reset-password`,
        {
            email: email
        })
            .then((res) => {
                // setTimeout(() => {
                //     window.location = "/login" ;
                //     history.push("/login");
                // }, 500);
                
            })
            .catch((err) => {
                // alert("Merci de vérifier vos identifiants ou de rééssayer plus tard.", JSON.strigify(err));
                console.log(err)
            })
    };
    return(
        <div className="reset-page">
            <div className="reset-form">
                <div className="form-group">
                    <span>Réinitialiser votre mot de passe</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-group">
                        <label>Saisissez votre adresse mail</label>
                        <input
                            {...register('email', { required: true })}
                            id="email"
                            name="email"
                            type="email"
                            className="form-control shadow-none"
                            style={{ borderColor: "#D1D4D5"}}
                        />
                        <div>{errors.email?.message}</div>
                    </div>
                    <div className="submit-reset">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Reset);