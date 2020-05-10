import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class GroupesBox extends Component {

    render(){

        return (
            <div className="groupesBox">
                <h1>Mes groupes</h1>
                <div className="addGroup">
                    <div className="addGroupCroix">+</div>
                </div>
            </div>
        )
    }
}

export default withRouter(GroupesBox);
