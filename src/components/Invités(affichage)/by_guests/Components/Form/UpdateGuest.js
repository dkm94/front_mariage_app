import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

const UpdateGuest = ({ edit, setEdit, onSubmit, mariageID }) => {
    const [family, setFamily] = useState({
        firstPerson: "",
        secondPerson: ""
    })
    const [radioValue, setRadioValue] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/admin/wedding/${mariageID}`, {withCredentials: true})
                .then(res => {
                    setFamily({
                        firstPerson: res.data.firstPerson,
                        secondPerson: res.data.secondPerson
                    })
                })
                .catch(err => console.log(err))
        }
        fetchData()}, [mariageID])

    const [input, setInput] = useState(edit ? edit.name : '')
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleRadio = (e) => {
        setRadioValue(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({
            id: edit.id,
            name: input
        });
        if(input.trim() === ""){
            return
        } else {
            axios.post(`api/admin/guests/edit/${edit.id}`, {
                _id: edit.id,
                name: input,
                family: radioValue
            })
            .then((res) => {
                onSubmit(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        setEdit({ id: "" })
        setInput('');
    };

    return (
        <>
            <div className="nameField guest__updateForm" id="input___nameField">
               <form onSubmit={handleSubmit} id="update-form">
                    <input 
                    type="text"
                    name="name"
                    onChange={handleChange} 
                    value={input}
                    ref={inputRef}
                    required
                    />
                    <div className="chose-family">
                        <p>
                            <input type="radio" id="test1" name="radio-group" value="1" onChange={handleRadio} />
                            <label htmlFor="test1">Famille de {family.firstPerson}</label>
                        </p>
                        <p>
                            <input type="radio" id="test2" name="radio-group" value="2" onChange={handleRadio} />
                            <label htmlFor="test2">Famille de {family.secondPerson} </label>
                        </p>
                    </div>
                    <button className="nameField___btns">
                        <i className="fas fa-check"/>
                    </button>
               </form>
            </div>
        </>
    )
}

export default UpdateGuest;
