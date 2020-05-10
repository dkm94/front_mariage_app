import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class GroupesBox extends Component {

    render(){

        return (
            <div className="menusBox">
                <h1>Mes menus</h1>
                <div className="addMenu">
                    <div className="addMenuCroix">+</div>
                </div>
            </div>
        )
    }
}

export default withRouter(GroupesBox);
