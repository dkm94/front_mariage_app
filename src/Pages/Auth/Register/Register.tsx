import "./Register.css";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { History } from 'history';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField, Button } from "@mui/material";

import Toast from "../../../components/Toast/Toast";
import { CustomButton } from "../../../components/Buttons";

import { UserType } from "../../../../types";
import { register as customRegister } from "../../../services/authRequests";
import { useFetch } from "../../../hooks";
import { getAdmins } from "../../../services/adminRequests";
import { ApiResponse } from "../../../helpers/requestHandler";

type Auth = {
  email: string;
  password: string;
  firstPerson: string;
  secondPerson: string;
  confirmPassword: string;
}

interface RegisterProps {
  setShowForm: Dispatch<SetStateAction<string>>
}

const Register = (props: RegisterProps) => {
  const { setShowForm } = props;
  const history: History = useHistory();

  const [loadingButton, setLoadingButton] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);

  const [tempArr, setTempArr] = useState<UserType[]>([]);

  const validationSchema = Yup.object().shape({
    checkEmail: Yup.boolean(),
    email: Yup.string()
      .email("Cet email est invalide.")
      .required("Veuiller compléter ce champ.")
      .test(
        "checkEmail",
        "Cet utilisateur existe déjà.",
        (value:string) => !tempArr.map((account) => account?.email).includes(value),
      ),
    password: Yup.string()
      .required("Veuiller compléter ce champ.")
      .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial."
      ),
    firstPerson: Yup.string()
      .required("Veuiller compléter ce champ.")
      .min(1, "Le nom doit au moins contenir 1 caractère.")
      .max(50, "Le nom ne peut comporter plus de 50 caractères."),
    secondPerson: Yup.string()
      .required("Veuiller compléter ce champ.")
      .min(1, "Le nom doit au moins contenir 1 caractère.")
      .max(50, "Le nom ne peut comporter plus de 50 caractères."),
    confirmPassword: Yup.string()
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "La confirmation du mot de passe doit correspondre au mot de passe saisi précédemment."
        ),
      })
      .required("Veuiller compléter ce champ."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: yupResolver(validationSchema),
  });

  const { data: admins } = useFetch<void, UserType[]>(getAdmins, []);
  useEffect(() => {
    if(admins) setTempArr(admins);
  }, [admins])

  const onSubmit = async ({ firstPerson, secondPerson, email, password }): Promise<void> => {
    setLoadingButton(true);
    
    const response:ApiResponse<Auth> = await customRegister({ firstPerson, secondPerson, email, password });
    const { success, message } = response;

    if(!success) {
      setLoadingButton(false);
      setMessageType("error");
      setMessage(message);
    }

    if(success){
      setLoadingButton(false);
      setMessageType("success");
      setMessage(message);
      setTimeout(() => {
        setShowForm("login")
      }, 4500);
    }
  };

  return (
    <div className="register-page">
      <Toast message={message} messageType={messageType} />
      <div className="register-grid">
        <div className="grid-item-2">
          <div className="register">
            <div className="form-group">
              <h1 style={{ fontSize: "1.5rem" }}>Inscrivez-vous</h1>
            </div>
            <div className="register__form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <TextField
                    label="Prénom 1"
                    size="small"
                    {...register("firstPerson", { required: true })}
                    id="firstPerson"
                    name="firstPerson"
                    type="text"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <span>{errors.firstPerson?.message}</span>
                </div>
                <div className="form-group">
                  <TextField
                    label="Prénom 2"
                    size="small"
                    {...register("secondPerson", { required: true })}
                    id="secondPerson"
                    name="secondPerson"
                    type="text"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <span>{errors.secondPerson?.message}</span>
                </div>
                <div className="form-group">
                  <TextField
                    label="Email"
                    size="small"
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    // class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <span>{errors.email?.message}</span>
                </div>
                <div className="form-group">
                  <TextField
                    label="Mot de passe"
                    size="small"
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    // class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <span>{errors.password?.message}</span>
                </div>
                <div className="form-group">
                  <TextField
                    label="Confirmer le mot de passe"
                    size="small"
                    {...register("confirmPassword", { required: true })}
                    id="password"
                    name="confirmPassword"
                    type="password"
                    // class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <span>{errors.confirmPassword?.message}</span>
                </div>
                <div className="form-group">
                  <CustomButton 
                  variant="contained" 
                  type="submit" 
                  text={loadingButton
                      ? "Veuillez patienter..."
                      : "Créer un compte"} />
                </div>
                <div className="register__signup">
                  <p>
                    Déjà inscrit ? &nbsp;
                    <Button
                      style={{
                        textTransform: "unset",
                        fontSize: "unset",
                        marginTop: "-2px",
                        color: "#000",
                      }}
                      onClick={() => {
                        setShowForm("login")

                        const currentPosition: number = window.scrollY;
                          history.replace("/login", { currentPosition });
                        }}
                    >
                      Connectez-vous
                    </Button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
