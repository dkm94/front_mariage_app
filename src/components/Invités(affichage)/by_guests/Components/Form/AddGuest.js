import React, { useState, useRef } from "react";
import Button from '@material-ui/core/Button/Button';
import axios from 'axios';
import "../../../../../Pages/Invités/Invités.css";

const AddGuestForm = ({ addGuest }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        axios.post("/api/admin/guests/add", {
            name: input
        })
        .then(res => {
            addGuest(res.data);
            setInput("");
        })
        .catch(err => console.log("err", err))       
    }

    return(
        <form onSubmit={handleSumbit} className="input-group mb-3">
           <div>
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
                <Button 
                type="submit"
                className="btn shadow-none"
                id="button-addon2"
                ><i className="fas fa-long-arrow-alt-right" /></Button>
           </div>
        </form>
    )
}

export default AddGuestForm;