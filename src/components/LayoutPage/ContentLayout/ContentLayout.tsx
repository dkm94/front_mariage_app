import "./ContentLayout.css";

import React, { useContext, ReactNode } from 'react';

import { Grow } from "@mui/material";

import ScreenLoader from "../../Loader/Screen/ScreenLoader.jsx"
import { ScrollButtonContext } from "../../../App";
import PageTitle from "../PageTitle/PageTitle";
import PageBanner from "../PageBanner/PageBanner";

interface ContentLayoutProps {
    loading: boolean;
    title: string;
    src: string;
    children: any;
}

const ContentLayout = (props: ContentLayoutProps) => {
    const { loading, title, src, children } = props;

    const scrollBtn = useContext(ScrollButtonContext);

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
        </div>
    )
}

export default ContentLayout