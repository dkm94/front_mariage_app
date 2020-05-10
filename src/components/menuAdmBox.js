import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";

class MenuAdmBox extends Component {

    render(){

        return (
            <ul className="menuAdmBox">
                <li className="ongletMenu"><Link to="/Groupes"><h2>GROUPE</h2></Link></li>
                <li className="ongletMenu"><Link to="/Tables"><h2>TABLE</h2></Link></li>
                <li className="ongletMenu"><Link to="/Menus"><h2>MENU</h2></Link></li>
                <li className="ongletMenu"><Link to="/Gâteau"><h2>GÂTEAU</h2></Link></li>
            </ul>
        )
    }
}

export default withRouter(MenuAdmBox);
