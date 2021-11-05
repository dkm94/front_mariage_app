import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

const UpdateMaincourse = ({ edit, setEdit, editMaincourse }) => {

    const [input, setInput] = useState(edit ? edit.name : '')
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(input.trim() === ""){
            return
        } else {
            axios.post(`/api/admin/menu/maincourses/edit/${edit.id}`, {name: input})
                .then((res) => {
                    editMaincourse(res.data)
                    setEdit('')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        setEdit({ id: "" })
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="name"
            onChange={handleChange} 
            value={input}
            ref={inputRef}
            />
        </form>
    )
}

export default UpdateMaincourse;