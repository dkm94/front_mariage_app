import React, { useState, useRef } from "react";
import axios from 'axios';
import "../../Menu.css";

const AddMaincourseForm = ({ addMaincourse, icon }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`/api/admin/menu/maincourses/add`,{
            name: input
        })
        .then((res) => {
            addMaincourse(res.data);
            setInput("");
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)})      
    }

    return(
        <form onSubmit={handleSumbit} className="input-group mb-3" >
            <div className="add-input">
                {/* <img src={icon} alt="icone d'ajout" /> */}
                <input
                type="text"
                name="name" 
                value={input} 
                onChange={handleChange}
                ref={inputRef}
                placeholder="Boeuf bourguignon..."
                required
                />
                <button type="submit" className="btn shadow-none submit-menu-item">{loading ? "..." : "Ajouter"}</button>
            </div>
        </form>
    )
}

export default AddMaincourseForm;