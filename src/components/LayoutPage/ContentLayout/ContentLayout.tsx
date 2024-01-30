import "./ContentLayout.css";
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect } from 'react';

import { Grow } from "@mui/material";
import { Slide, ToastContainer, toast } from 'react-toastify';

import ScreenLoader from "../../Loader/Screen/ScreenLoader.jsx"
import { ScrollButtonContext } from "../../../App";
import PageTitle from "../PageTitle/PageTitle";
import PageBanner from "../PageBanner/PageBanner";
import Toast from "../../Toast/Toast";

interface ContentLayoutProps {
    loading: boolean;
    title: string;
    src: string;
    children: any;
    error?: any;
    errorMessage?: string;
    message: string | undefined;
    messageType: "error" | "success" | undefined;
    id: string;
}

const ContentLayout = (props: ContentLayoutProps) => {
    const { loading, title, src, children, error, errorMessage, message, messageType, id } = props;

    const scrollBtn = useContext(ScrollButtonContext);

    // update toast (passer data ici ou créer le toast dans la fonction edit)
    // changer le texte du bouton en "Enregistré !" => Voir loading button mui
    // useEffect(() => {
    //     const showToastMessage = () => {
    //         toast.error(errorMessage, {
    //             position: "bottom-left",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Slide,
    //         });
    //     };
    //     if(error) {
    //         showToastMessage();
    //     }
    // }, [error, errorMessage]);

    if(loading) {
        return <ScreenLoader />
    }

    return (
        <div className="page-component">
            {scrollBtn}

            <PageTitle loading={loading} title={title} />
            <PageBanner loading={loading} src={src} />

            <Grow in={!loading} timeout={2000}>
                <div className="page-container">
                    {children}
                </div>
            </Grow>

            {message ? <Toast message={message} messageType={messageType} id={id} /> : null}
        </div>
    )
}

export default ContentLayout