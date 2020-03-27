import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';

class Home extends Component {

    render(){

        return (
            <div>
                <Navbar />
                <Register />
            </div>
        )
    }
}

export default withRouter(Home);
