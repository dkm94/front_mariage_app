import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './Header';
import Navbar from './Navbar';
import TablesBox from './TablesBox';
import Footer from './Footer';

class Tables extends Component {

    render(){

        return (
            <div className="tables">
                <Header />
                <Navbar />
                <TablesBox />
                <Footer />
            </div>
        )
    }
}

export default withRouter(Tables);
