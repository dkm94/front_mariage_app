import "./Login.css";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { History } from 'history';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { Button, styled } from "@material-ui/core";

import { ILoginProps } from "../../../../types";
import { ErrorAlert } from "../../../components/Alert";

const CustomButton = styled(Button)({
  textTransform: "unset",
  backgroundColor: "#262626",
  color: "#fff",
  //   fontfamily: "unset",
  fontSize: "1rem",
  borderRadius: "36px",
  paddingRight: "30px",
  paddingLeft: "30px",
  fontWeight: "unset",
  fontFamily: "Playfair Display serif",
  border: "none",
  width: "fit-content",
  ":hover": {
    background: "#4c4a4a",
    animation: "none",
    border: "none",
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Veuillez compléter ce champ."),
  password: Yup.string().required("Veuillez compléter ce champ."),
});

// type LoginForm = Yup.InferType<typeof validationSchema>;

const Login = ({ setShowForm }: ILoginProps) => {

  const history: History = useHistory();

  const [showError, setShowError] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //todo: handle errors front or back side
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
            window.location = "/tableau-de-bord";
            history.push("/tableau-de-bord");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
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
        title="Oups, une erreur est survenue. Veuillez vérifier vos identifiants ou essayer plus tard."
        description="Veuillez réessayer plus tard"
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
                    class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors.email?.message}</div>
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
                    class="form-control shadow-none"
                    style={{ borderColor: "#D1D4D5" }}
                  />
                  <div>{errors.password?.message}</div>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    style={{ width: "100%", textTransform: "unset" }}
                    fullWidth
                  >
                    {loadingButton ? "Veuillez patienter..." : "Se connecter"}
                  </CustomButton>
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
                    onClick={() => setShowForm("register")}
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
