import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/App.css';
import '../src/index.css';
import Layout from "./Layout";
import Footer from "../src/components/Footer/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <App />
      {/* <Footer className="footer-component"/> */}
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);

