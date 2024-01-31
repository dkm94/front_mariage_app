import "./Login.css";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { History } from 'history';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import decode from "jwt-decode";

import { TextField } from "@mui/material";

import { AuthSwitchButton, CustomButton } from "../../../components/Buttons";
import Toast from "../../../components/Toast/Toast";

import { UserType } from "../../../../types";
import { login } from "../../../services";
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

  const handleSwitch = (): void => {
    setShowForm("register");
    const currentPosition: number = window.scrollY;
    history.replace("/register", { currentPosition });
  };

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
              <h1>Connectez-vous</h1>
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
                  />
                  <div>{errors?.password?.message}</div>
                </div>
                <div className="form-group">
                  <CustomButton
                    type="submit"
                    variant="contained"
                    text={loadingButton ? "..." : "Se connecter"}  
                  />
                </div>
                <div className="login__signup">
                  <span>Vous n'avez pas encore de compte ?</span>
                  <AuthSwitchButton
                    text="Inscrivez-vous"
                    onClick={handleSwitch}
                  />
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
