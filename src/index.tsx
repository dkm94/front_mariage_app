import "../src/App.css";
import "../src/index.css";

import React, { Fragment, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Layout from "./Layout";

const StrictModeWrapper = process.env.NODE_ENV === 'development' ? StrictMode : Fragment;

ReactDOM.render(
  <StrictModeWrapper>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </StrictModeWrapper>,
  document.getElementById("root")
);
