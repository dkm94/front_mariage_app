import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';
import GroupesBox from './GroupesBox';

class Groupes extends Component {

    render(){

        return (
            <div className="groupes">
                <Navbar />
                <GroupesBox />
            </div>
        )
    }
}

export default withRouter(Groupes);
