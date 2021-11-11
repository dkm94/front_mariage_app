import React, { useState, useRef } from "react";
import axios from 'axios';
import "../Tables.css";

const AddTableForm = ({ addTable }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        setLoading(true)
        axios.post("/api/admin/tables/add", {
            name: input
        })
        .then(res => {
            addTable(res.data);
            setInput("");
            setLoading(false);
        })
        .catch(err => console.log("err", err))       
    }

    return(
        <form onSubmit={handleSumbit} className="input-group mb-3">
            <div className="add-input">
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
                >{loading ? "..." : "Ajouter"}</button>
            </div>
        </form>
    )
}

export default AddTableForm;