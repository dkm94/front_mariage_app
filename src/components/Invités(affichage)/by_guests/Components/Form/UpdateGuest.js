import React, { useState, useRef, useEffect } from 'react'

const UpdateGuest = ({ edit, setEdit, onSubmit }) => {

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
        onSubmit({
            id: edit.id,
            name: input
        });
        setInput('');
    };

    console.log(input)

    return (
        <>
            <div className="nameField" id="input___nameField">
               <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    onChange={handleChange} 
                    value={input}
                    ref={inputRef}
                    required
                    />
                    <button onClick={handleSubmit} id="nameField___check_btn">
                        <i className="fas fa-check"/>
                    </button>
                    <button onClick={() => setEdit({id: null})}>
                        <i className="fas fa-undo"></i>
                    </button>
               </form>
            </div>
        </>
    )
}

export default UpdateGuest;
