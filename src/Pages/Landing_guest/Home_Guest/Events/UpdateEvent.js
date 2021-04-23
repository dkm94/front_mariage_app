import React, { useState, useEffect, useRef } from 'react';

const UpdateEvent = ({ edit, setEdit, onSubmit }) => {

    const [input, setInput] = useState(edit ? edit.obj : '')

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
            eventTitle: '',
            eventPlace: '',
            eventTime: '',
            eventAddress: ''
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
                        value={input.eventTitle}
                        ref={inputRef} />

                        <input 
                        type="text" 
                        name="eventPlace"
                        onChange={handleChange} 
                        value={input.eventPlace}
                        ref={inputRef} />

                        <input 
                        type="datetime-local"
                        name="eventTime"
                        onChange={handleChange} 
                        value={input.eventTime} />

                        <input 
                        type="text"
                        name="eventAddress"
                        onChange={handleChange} 
                        value={input.eventAddress} />

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

export default UpdateEvent;
