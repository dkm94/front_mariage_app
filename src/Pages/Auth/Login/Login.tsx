import "./Login.css";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { History } from 'history';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import decode from "jwt-decode";

import { TextField } from "@mui/material";
import { Button } from "@material-ui/core";

import { UserType } from "../../../../types";

import { CustomButton } from "../../../components/Buttons";
import { login } from "../../../services";
import Toast from "../../../components/Toast/Toast";
import { ApiResponse } from "../../../helpers/requestHandler";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez compléter ce champ."),
  password: Yup.string().required("Veuillez compléter ce champ."),
});

// type LoginForm = Yup.InferType<typeof validationSchema>;
const win: Window = window;

type Auth = {
  email: string
  password: string
}
interface LoginProps {
  setShowForm: Dispatch<SetStateAction<string>>
}

const Login = (props: LoginProps) => {
  const { setShowForm } = props;

  const history: History = useHistory();

  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: yupResolver(validationSchema),
  });
  
  const onSubmit = async (form: Auth): Promise<void> => {
    setLoadingButton(true);

    const authResponse:ApiResponse<Auth> = await login({ email: form.email, password: form.password });
    const { success, statusCode, message, token } = authResponse;
    
    if(!success) {
      setLoadingButton(false);
      setMessageType("error");
      setMessage(message);
      return;
    }
    
    if (success && statusCode === 200 && token) {
      localStorage.setItem("token", token as string);
      const tokenInfos: string | null = localStorage.getItem("token");
      if(tokenInfos) {
        const decodedToken: UserType = decode(tokenInfos);
        if (decodedToken) {
          setTimeout(() => {
            win.location = `/mariage/${decodedToken?.id}/tableau-de-bord`; 
            history.push(`/mariage/${decodedToken?.id}/tableau-de-bord`);
          }, 500);
        }
      }
    }

    setTimeout(() => {
      setMessageType(undefined);
      setMessage(undefined);
    }, 3000);
  };

  return (
    <div className="login-page">
      {message === undefined ? null : <Toast message={message} messageType={messageType} /> }
      <div className="login-grid">
        <div className="grid-item-2">
          <div className="login">
            <div className="form-group">
              <h1 style={{ fontSize: "1.5rem" }}>Connectez-vous</h1>
            </div>
            <div className="login__form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <TextField
                    size="small"
                    label="Email"
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors?.email?.message}</div>
                </div>
                <div className="form-group">
                  <TextField
                    size="small"
                    label="Mot de passe"
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors?.password?.message}</div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    text={loadingButton ? "Veuillez patienter..." : "Se connecter"}  
                    style={{ width: "100%", "&:hover": { backgroundColor: "#333232" } }}
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

                      const currentPosition: number = window.scrollY;
                      history.replace("/register", { currentPosition });
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
