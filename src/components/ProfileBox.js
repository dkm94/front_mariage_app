import React, { Component } from 'react';


class ProfileBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <p>Profil de x</p>
                <div className="img-profile">
                    {/* <img alt="Photo ID"/> */}
                </div>
                <div className="guest-choice">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        )
    }
}

export default ProfileBox
