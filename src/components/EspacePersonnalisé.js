import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';
// import EspacePersoBox from './Register';
import Footer from './Footer';

class EspacePersonnalisé extends Component {

    render(){

        return (
            <div className="espacePerso">
                <Navbar />
                {/* <EspacePersoBox /> */}
                <Footer />
            </div>
        )
    }
}

export default withRouter(EspacePersonnalisé);
