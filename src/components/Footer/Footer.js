import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import enveloppe from "../../img/enveloppe.png";
import mailgo, { MailgoConfig } from "mailgo";
import "./Footer.css";

mailgo();

const mailgoConfig: MailgoConfig = {
    dark: false,
    lang: "fr",
    showFooter: false,
};


const Footer = ({token}) => {
    
    useEffect(() => {
        mailgo(mailgoConfig);
      }, []);
      
    return(
        <div className="footer">
            <div className="footer-dims">
                <div className="footer-dims___span">
                    <span>© Copyright 2021 - Tous droits réservés</span>
                </div>
                {/* <div className="footer-dims___links">
                    <a
                    className="App-link"
                    href="mailto:diane.mpacko@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <img src={enveloppe} alt="Envoyer un message" id="enveloppe-logo" />
                    </a>
                </div> */}
            </div>
        </div>
    )
}

export default Footer;