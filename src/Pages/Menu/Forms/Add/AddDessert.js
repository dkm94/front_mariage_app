import React, { useState, useRef } from "react";
import axios from 'axios';
import "../../Menu.css";

const AddDessertForm = ({ addDessert, icon }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        setLoading(true)
        axios.get("/api/admin/menu")
        .then((res) => {
            const data = res.data;
            const result = data._id
            if(data){
                axios.post(`/api/admin/menu/desserts/add/${result}`,{
                    name: input
                })
                .then((res) => {
                    addDessert(res.data);
                    setInput("");
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)})
                }
        })      
    }

    return(
        <form onSubmit={handleSumbit} className="input-group mb-3">
            <div className="add-input">
                {/* <img src={icon} alt="icone d'ajout" /> */}
                <input
                type="text"
                name="name" 
                value={input} 
                onChange={handleChange}
                ref={inputRef}
                placeholder="Sorbet aux fruits..."
                required
                />
                <button type="submit" className="btn shadow-none submit-menu-item">{loading ? "..." : "Ajouter"}</button>
            </div>
        </form>
    )
}

export default AddDessertForm;