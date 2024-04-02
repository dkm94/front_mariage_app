import "./ContentLayout.css";
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext } from 'react';

import { Grow } from "@mui/material";

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
    id?: string;
}

const ContentLayout = (props: ContentLayoutProps) => {
    const { loading, title, src, children, message, messageType, id } = props;

    const scrollBtn = useContext(ScrollButtonContext);

    if(loading) {
        return <ScreenLoader />
    }

    return (
        <div className="page-component">
            {scrollBtn}

            <PageTitle loading={loading} title={title} />
            {title !== "Paramètres du compte" && <PageBanner loading={loading} src={src} />}

            <Grow in={!loading} timeout={2000}>
                <section id="main-content">
                    <div className="page-container">
                        {children}
                    </div>
                </section>
            </Grow>

            {/* TODO: Créer un state tableau pour stocker les messages et les types pour pouvoir display plusieurs messages à la fois */}
            {message ? <Toast message={message} messageType={messageType} id={id} /> : null}
        </div>
    )
}

export default ContentLayout