import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class MenuAdmBox extends Component {

    render(){

        return (
            <div className="menuAdmBox">
                <section className="ongletMenu"><h2>GROUPE</h2></section>
                <section className="ongletMenu"><h2>TABLE</h2></section>
                <section className="ongletMenu"><h2>MENU</h2></section>
                <section className="ongletMenu"><h2>GÂTEAU</h2></section>
            </div>
        )
    }
}

export default withRouter(MenuAdmBox);
