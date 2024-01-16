import "./Login.css";

import React, { useState } from "react";
import { History } from 'history';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField } from "@mui/material";
import { Button, styled } from "@material-ui/core";

import { ILoginProps } from "../../../../types";

import { ErrorAlert } from "../../../components/Alert";
import { BlackButton } from "../../../components/Buttons";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez compléter ce champ."),
  password: Yup.string().required("Veuillez compléter ce champ."),
});

// type LoginForm = Yup.InferType<typeof validationSchema>;
const win: Window = window;

type FormValues = {
  email: string
  password: string
}

const Login = ({ setShowForm }: ILoginProps) => {

  const history: History = useHistory();

  const [error, setError] = useState<string>("")
  const [showError, setShowError] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  

  //todo: use formik Form instead of html form
  //todo: handle yup schema
  

  const onSubmit = async (form) => {
    setLoadingButton(true);

    await axios
      .post(`/api/auth/adminLogin`, form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        if (token) {
          setTimeout(() => {
            setLoadingButton(false);
            win.location = "/tableau-de-bord";
            history.push("/tableau-de-bord");
          }, 500);
        }
      })
      .catch((err) => {
    //todo: better error handling from backend (status code (401, 400, 500) + message)
    // todo: handle email error

        setError(err.response.data.message)
        setShowError(true);
        setLoadingButton(false);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      });
  };


  return (
    <div className="login-page">
      <ErrorAlert
        showError={showError}
        title={error}
        description={"Veuillez réessayer"}
      />
      <div className="login-grid">
        <div className="grid-item-2">
          <div className="login">
            <div className="form-group">
              <h1 style={{ fontSize: "1.5rem" }}>Connectez-vous</h1>
            </div>
            <div className="login__form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  {/* <label>Email</label> */}
                  <TextField
                    size="small"
                    label="Email"
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    // class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors?.email?.message}</div>
                </div>
                <div className="form-group">
                  {/* <label>Mot de passe</label> */}
                  <TextField
                    size="small"
                    label="Mot de passe"
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    // class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors?.password?.message}</div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <BlackButton
                    type="submit"
                    variant="contained"
                    text={loadingButton ? "Veuillez patienter..." : "Se connecter"}  
                    // sx={{ "&:hover": { backgroundColor: "#333232" } }}
                    // style={{ borderRadius: "20px", padding: "6px 16px", flexGrow: 1,textTransform: "unset" }}
                  />
                </div>
                <div
                  className="login__signup"
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span>Vous n'avez pas encore de compte ?</span>
                  <Button
                    style={{
                      background: "none",
                      textTransform: "unset",
                      padding: 0,
                      fontSize: "unset",
                      marginTop: "-2px",
                    }}
                    onClick={() => {
                      setShowForm("register");
                      history.push("/register");
                    }}
                  >
                    <span>Inscrivez-vous</span>
                  </Button>
                  {/* <p className="forgotten-password"><Link to={"/reset-password"}>Mot de passe oublié ?</Link></p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
