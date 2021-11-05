import React from "react";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import "./Success.css";

const SuccessAlert = ({ showAlert, title, description }) => {
    return(
        <div style={{ display: showAlert ? "block" : "none" }} className="show-success fade-in" >
            <Alert severity="success">
                <AlertTitle>{title}</AlertTitle>
                {description}
            </Alert>
        </div>
    )
}
export default SuccessAlert;