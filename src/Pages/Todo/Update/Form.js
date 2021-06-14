import React, { useState, useEffect, useRef } from 'react';

const UpdateTask = ({ edit, setEdit, onSubmit }) => {

    const [input, setInput] = useState(edit ? edit.obj : '')
    console.log(input)

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        const {value, name} = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({
            id: edit.id,
            event: input
        });
        setInput({
            text: '',
            color: ''
        });
    };

    return (
        <div className="events-list___inputs">
            <form onSubmit={handleSubmit} className='todo-form'>
                {edit ?
                    <>
                        <input 
                        type="text"
                        name="eventTitle"
                        onChange={handleChange}  
                        value={input.text}
                        ref={inputRef} />

                        <button onClick={handleSubmit}>
                            <i className="fas fa-check"/>
                        </button>
                        <button onClick={() => setEdit({id: null})}><i className="fas fa-undo"></i></button>
                    </>
                : null }
            </form>
        </div>
    )
}

export default UpdateTask;
