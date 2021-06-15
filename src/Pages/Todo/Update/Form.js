import React, { useEffect } from 'react';
import "./Form.css";

const UpdateTask = ({ edit, setEdit, input, handleChange, inputRef, editTodo }) => {

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleValue = content => {
        handleChange(content)
    }

    return (
        <div>
            <form onSubmit={editTodo} className='todo-form'>
                {edit ?
                    <>
                        <input 
                        type="text"
                        name="text"
                        onChange={handleValue}  
                        value={input.text}
                        ref={inputRef} />

                        <button type="submit">
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
