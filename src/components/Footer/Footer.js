import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import enveloppe from "../../img/enveloppe.png";
import mailgo, { MailgoConfig } from "mailgo";
import "./Footer.css";

mailgo();

const mailgoConfig: MailgoConfig = {
    dark: false,
    lang: "fr",
    showFooter: false,
};


const Footer = () => {
    
    useEffect(() => {
        mailgo(mailgoConfig);
      }, []);
      
    return(
        <div className="footer">
            <div className="footer-dims">
                <div className="footer-dims___span">
                    <span>Développé par <Link to={"https://github.com/dkm94"}>Diane M.</Link></span>
                </div>
                <div className="footer-dims___links">
                    <a
                    className="App-link"
                    href="mailto:diane.mpacko@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <img src={enveloppe} alt="Envoyer un message" id="enveloppe-logo" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;