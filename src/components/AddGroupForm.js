import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class AddGroupForm extends Component {
        // constructor(props) {
        //     super(props);
        // }
    
    render(){
console.log(this.props.visible)
        return (
            <div className="groupesBox" style={{display: this.props.visible ? 'flex' : 'none'}}>
                <form encType="application/x-www-form-urlencoded" method="post">
                    <label>Nom
                    <input type="text" name="name"/>
                    </label>

                    <label>Email
                    <input type="email" name="mail"/>
                    </label>
                </form>
            </div>
        )
    }
}

export default withRouter(AddGroupForm);
