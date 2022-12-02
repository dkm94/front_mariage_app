import React, { useState, useRef } from "react";
import axios from 'axios';
import "../../Menu.css";

const AddApetizerForm = ({ addApetizer, icon }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        setLoading(true)
        axios.post(`/api/admin/menu/apetizers/add`,{
            name: input
        })
        .then((res) => {
            addApetizer(res.data);
            setInput("");
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)})
    }    

    return(
        <form onSubmit={handleSumbit}  className="input-group mb-3">
            <div className="add-input" >
                {/* <img src={icon} alt="icone d'ajout"/> */}
                <input
                type="text"
                name="name" 
                value={input} 
                onChange={handleChange}
                ref={inputRef}
                placeholder="Petits fours..."
                required
                />
                <button type="submit" className="btn shadow-none submit-menu-item">{loading ? "..." : "Ajouter"}</button>
            </div>
        </form>
    )
}

export default AddApetizerForm;