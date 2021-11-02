import React, { useState, useRef } from "react";
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
        .catch(err => console.log(err))       
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
                <button 
                type="submit"
                className="btn shadow-none"
                id="button-addon2"
                ><i className="fas fa-long-arrow-alt-right" /></button>
           </div>
        </form>
    )
}

export default AddGuestForm;