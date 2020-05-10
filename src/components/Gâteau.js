import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import CakeBox from './Gâteau';
import Footer from './Footer';

class Cake extends Component {

    render(){

        return (
            <div className="cake">
                <Header />
                <Navbar />
                <CakeBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Cake);
