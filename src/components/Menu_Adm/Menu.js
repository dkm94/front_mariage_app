import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import "./Menu.css";

class MenuAdmBox extends Component {

    render(){

        return (
            <div className="menu-adm container">
                <div className="menu-adm-desc">
                    <span>Cliquez sur les ongles ci-dessous pour gérer les différents éléments de l'evènement:</span>
                </div>
                <section className="grid-container">
                    <div className="grid-item item1">
                        <div className="grid-item-title"><h2>Faire-part</h2></div>
                    </div>
                    <div className="grid-item item2">
                        <div className="grid-item-title"><Link to="/Groupes"><h2>Invités</h2></Link></div>
                    </div>
                    <div className="grid-item item3">
                        <div className="grid-item-title"><Link to="/Tables"><h2>Tables</h2></Link></div>
                    </div>
                    <div className="grid-item item4">
                        <div className="grid-item-title"><Link to="/Menus"><h2>Menu</h2></Link></div>
                    </div>
                </section>
                
            </div>
        )
    }
}

export default withRouter(MenuAdmBox);
