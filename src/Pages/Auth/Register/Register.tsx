import "./Register.css";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

import { IRegisterProps, UserType } from "../../../../types";
import { SuccessAlert, ErrorAlert } from "../../../components/Alert";
import { BlackButton } from "../../../components/Buttons";

type FormValues = {
  email: string;
  password: string;
  firstPerson: string;
  secondPerson: string;
  confirmPassword: string;
}

const Register = ({ setShowForm }: IRegisterProps) => {

  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

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
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  
  useEffect(() => {
    const fetchData = async () => {
      const myHeaders: Headers = new Headers();
      const myInit = { method: "GET", headers: myHeaders, mode: "cors" as RequestMode };
      await fetch(
        `https://my-wedding-backend.onrender.com/api/admin/admin/`,
        myInit
      )
        .then((res) => res.json())
        .then((emailArr) => {
          setTempArr(emailArr);
        })
        .catch((err) => {
          //do something, show error
          console.log(err)
        });
    };
    fetchData();
  }, []);

  const onSubmit = async ({ firstPerson, secondPerson, email, password }) => {
    setLoadingButton(true);
    await axios
      .post(`/api/auth/createAccount`, {
        firstPerson: firstPerson,
        secondPerson: secondPerson,
        email: email,
        password: password,
      })
      .then((res) => {
        setShowAlert(true);
        setLoadingButton(false);
        setTimeout(() => {
          setShowAlert(false);
          setShowForm("login")
        }, 4500);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      });
  };

  return (
    <div className="register-page">
      <ErrorAlert
        showError={showError}
        title="Oups, une erreur est survenue"
        description="Veuillez réessayer plus tard"
      />
      <SuccessAlert
        showAlert={showAlert}
        title="Votre compte a été créé avec succès"
        description="Redirection vers la page de connexion..."
      />
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
                  <BlackButton type="submit" variant="contained" text={loadingButton
                      ? "Veuillez patienter..."
                      : "Créer mon compte"} />
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
                      onClick={() => setShowForm("login")}
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
