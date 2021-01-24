import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import TablesBox from './TablesBox';


class Tables extends Component {

    render(){

        return (
            <div className="tables">

                <TablesBox />

            </div>
        )
    }
}

export default withRouter(Tables);
