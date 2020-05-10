import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import GroupesBox from './GroupesBox';
import Footer from './Footer';

class Groupes extends Component {

    render(){

        return (
            <div className="groupes">
                <Header />
                <Navbar />
                <GroupesBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Groupes);
