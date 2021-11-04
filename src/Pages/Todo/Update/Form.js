import React, { useEffect } from 'react';
import "./Form.css";

const UpdateTask = ({ edit, input, handleChange, inputRef, editTodo }) => {

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleValue = content => {
        handleChange(content)
    }

    return (
        <form onSubmit={editTodo} className='todo-form'>
            {edit ?
                <>
                    <input 
                    type="text"
                    name="text"
                    onChange={handleValue}  
                    value={input.text}
                    ref={inputRef} />
                </>
            : null }
        </form>
    )
}

export default UpdateTask;
