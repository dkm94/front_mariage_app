import "./PageTitle.css";

import React from 'react';

import { Grow } from "@mui/material";

interface IPageTitle {
    loading: boolean;
    title: string
}

const PageTitle = (props: IPageTitle) => {
    const { title, loading } = props;

  return (
    <Grow in={!loading}>
        <div className="titles mb3" style={{ marginBottom: "1rem" }}>
            <h2>{title}</h2>
        </div>
    </Grow>
  )
}

export default PageTitle