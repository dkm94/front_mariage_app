import "./ContentLayout.css";

import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect } from 'react';

import { Grow } from "@mui/material";
import { Slide, ToastContainer, toast } from 'react-toastify';

import ScreenLoader from "../../Loader/Screen/ScreenLoader.jsx"
import { ScrollButtonContext } from "../../../App";
import PageTitle from "../PageTitle/PageTitle";
import PageBanner from "../PageBanner/PageBanner";

interface ContentLayoutProps {
    loading: boolean;
    title: string;
    src: string;
    children: any;
    error?: any;
    errorMessage?: string;
}

const ContentLayout = (props: ContentLayoutProps) => {
    const { loading, title, src, children, error, errorMessage } = props;

    const scrollBtn = useContext(ScrollButtonContext);

    
    useEffect(() => {
        const showToastMessage = () => {
            toast.error(errorMessage, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        };
        if(error) {
            showToastMessage();
        }
    }, [error, errorMessage]);

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

            <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide} 
            />
        </div>
    )
}

export default ContentLayout