import React, { useState, useRef } from "react";
// import Button from '@material-ui/core/Button/Button';
import axios from 'axios';
import userIcon from "../../../../../img/user.png";
import "../../../../../Pages/Invités/Invités.css";

const AddGuestForm = ({ addGuest }) => {

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        setLoading(true)
        axios.post("/api/admin/guests/add", {
            name: input
        })
        .then(res => {
            addGuest(res.data);
            setInput("");
            setLoading(false)
        })
        .catch(err => console.log("err", err))       
    }

    return(
        <form onSubmit={handleSumbit} className="input-group mb-3">
           <div className="add-input">
                <img src={userIcon} alt="user icon" />
                <input
                type="text"
                className="form-control shadow-none"
                name="name"
                placeholder="Nouvel invité"
                value={input} 
                onChange={handleChange}
                ref={inputRef}
                required
                />
                <button 
                type="submit"
                className="btn shadow-none"
                id="button-addon2"
                >{loading ? "..." : "Ajouter"}</button>
           </div>
        </form>
    )
}

export default AddGuestForm;