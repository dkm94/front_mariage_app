import React, { useState, useRef } from "react";
import axios from 'axios';
import "../../Menu.css";

const AddStarterForm = ({ addStarter }) => {

    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault();
        axios.get("/api/admin/menu")
        .then((res) => {
            const data = res.data;
            const result = data._id
            if(data){
                axios.post(`/api/admin/menu/starters/add/${result}`,{
                    name: input
                })
                .then((res) => {
                    addStarter(res.data)
                    setInput("")
                })
                .catch((err) => {
                    console.log(err)})
                }
        })     
    }

    return(
        <form onSubmit={handleSumbit}>
            <input
            type="text"
            name="name" 
            value={input} 
            onChange={handleChange}
            ref={inputRef}
            required
            />
            <button type="submit" className="btn shadow-none submit-menu-item"><i className="fas fa-check" aria-hidden="true"></i></button>
        </form>
    )
}

export default AddStarterForm;