import "./PageBanner.css";
import bannerElements from "../../../data/banner.js";

import React, { useEffect, useState } from 'react';

import { Grow } from "@mui/material";

interface PageBannerProps {
    loading: boolean;
    src: string;
}

const PageBanner = (props: PageBannerProps) => {
    const { loading, src } = props;

    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        const res = bannerElements.find(element => element.name === src);
        if(res){
            setUrl(res.img)
        }
    }, [src])

    return (
    <Grow in={!loading} timeout={1000}>
        <div className="banner" style={{ backgroundImage: `url(${url})` }}></div>
    </Grow>
  )
}

export default PageBanner