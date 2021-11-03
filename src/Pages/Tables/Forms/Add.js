import React, { useState, useRef } from "react";
import axios from 'axios';
import "../Tables.css";

const AddTableForm = ({ addTable }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        console.log("🚀 ~ file: AddGuest.js ~ line 17 ~ AddGuestForm ~ input", input)
        axios.post("/api/admin/tables/add", {
            name: input
        })
        .then(res => {
            addTable(res.data);
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
                placeholder="Nom/Numéro de la table"
                value={input} 
                onChange={handleChange}
                ref={inputRef}/>
                <button 
                type="submit"
                className="btn shadow-none check-btn"
                id="button-addon2"
                ><i className="fas fa-long-arrow-alt-right" /></button>
            </div>
        </form>
    )
}

export default AddTableForm;