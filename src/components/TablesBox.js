import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class TablesBox extends Component {

    render(){

        return (
            <div className="tablesBox">
                <h1>Mes Tables</h1>
                <div className="addTable">
                    <div className="addTableCroix">+</div>
                </div>
            </div>
        )
    }
}

export default withRouter(TablesBox);
