import React from 'react';
import { withRouter, Link } from "react-router-dom";
import "./Menu.css";

const Menu = ({ userInfos: { invitationID } }) => {

    return (
        <div className="menu-admin-container">
            <div className="menu-adm container">
                <div className="menu-adm-desc">
                    <span>Cliquez sur les onglets ci-dessous pour gérer les différents éléments de l'evènement</span>
                </div>
                <section className="grid-container">
                    <div className="grid-item item1">
                        <div className="grid-item-title"><Link to={`/invitation/${invitationID}`}><h2>Faire-part</h2></Link></div>
                    </div>
                    <div className="grid-item item2">
                        <div className="grid-item-title"><Link to="/invités"><h2>Invités</h2></Link></div>
                    </div>
                    <div className="grid-item item3">
                        <div className="grid-item-title"><Link to="/tables"><h2>Tables</h2></Link></div>
                    </div>
                    <div className="grid-item item4">
                        <div className="grid-item-title"><Link to="/carte"><h2>Menu</h2></Link></div>
                    </div>
                </section>
            </div>
        </div>
    )
}


export default withRouter(Menu);
