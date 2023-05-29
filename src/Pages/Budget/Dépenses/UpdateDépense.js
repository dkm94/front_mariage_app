import React, { useState, useEffect, useRef } from 'react';

const UpdateExpense = ({ edit, setEdit, onSubmit }) => {

    const [input, setInput] = useState(edit ? edit.obj : '')
    // const editedPrice = input.price/100;
    // const fixedPrice = editedPrice.toFixed(2);

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
            expense: input
        });
        setInput({
            title: '',
            description: '',
            price: ''
        });
    };

    return (
        <div className="events-list___inputs">
            <form onSubmit={handleSubmit} className='todo-form'>
                {edit ?
                    <>
                        <input 
                        type="text"
                        name="title"
                        onChange={handleChange}  
                        value={input.title}
                        ref={inputRef} />

                        <input 
                        type="text" 
                        name="description"
                        onChange={handleChange} 
                        value={input.description}
                        ref={inputRef} />

                        <input 
                        type="text"
                        name="price"
                        onChange={handleChange} 
                        value={input.price}
                        ref={inputRef}
                         />

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

export default UpdateExpense;
