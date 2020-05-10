import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Logo from '../img/logo.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick = () => {
        this.props.history.push('/menuAdm')
    }

    render(){

        return (
            <div className="header">
                <img alt="logo" src={Logo} onClick={this.handleClick}/>
            </div>
        )
    }
}

export default withRouter(Header);
