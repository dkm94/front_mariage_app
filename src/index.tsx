import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "../src/App.css";
import "../src/index.css";
import Layout from "./Layout.tsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
