import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from './Navbar';
import TablesBox from './TablesBox';
import Footer from './Footer';

class Tables extends Component {

    render(){

        return (
            <div className="tables">
                <Navbar />
                <TablesBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Tables);
