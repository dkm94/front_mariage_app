import React from "react";
import RegisterForm from "./RegisterBox";
import LoginForm from "../Login/loginForm";
import "./Register.css";
import bridesmaids from "../../img/demoiselles.jpg";
import groom from "../../img/groom.jpg"

const Register = () => {
    return(
        <div className="container register">
            <section className="register-row">
                <div className="square-img">
                    <img alt="by Lovelyn Montepiog from Pixabay" src={bridesmaids}/>
                </div>
                <div className="square-text">
                    <RegisterForm />
                </div>
            </section>
            {/* <section className="register-row">
                <div className="square-img"></div>
                <div className="square-text"></div>
            </section> */}
            <section className="register-row reverse">
                <div className="square-img">
                    <img alt="by teresabreaux from Pixabay " src={groom}/>
                </div>
                <div className="square-text">
                    <LoginForm />
                </div>
            </section>
            {/* <section className="register-row">
                <div className="square-img"></div>
                <div className="square-text"></div>
            </section> */}
        </div>
    )
}

export default Register;