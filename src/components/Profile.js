import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ProfileBox from "./ProfileBox";

class Profil extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <Header />
                <Navbar />
                <ProfileBox />
            </div>
        )
    }
}

export default withRouter(Profil)