import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ProfilBox from "./ProfilBox";

class Profil extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: this.name
        }
    }
    
    // componentDidMount(){
    //     const token = localStorage.getItem("token")

    //      fetch("http://localhost:3050/guest/:id",
    //      {headers: {Accept: "application/json", Authorization: "Bearer " + token},
    //      method: "GET" },
    //     //  params: {id: }
    //      )
    //        .then(res => {
    //            return res.json()
    //        })
    //        .then(groups => {
    //         this.props.history.replace("/profil");
    //        })
    //        .catch((err)=>console.log('err:' + err));
    // }
    
    render() {
        return (
            <div>
                <Header />
                <Navbar />
                <ProfilBox />
            </div>
        )
    }
}

export default withRouter(Profil)