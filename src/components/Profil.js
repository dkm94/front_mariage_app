import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Profil extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: this.name
        }
    }
    
    // componentDidMount(){
    //     const token = localStorage.getItem("token")

    //      fetch("https://backend-mywedding-app.herokuapp.com/guest/:id",
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

            </div>
        )
    }
}

export default withRouter(Profil)