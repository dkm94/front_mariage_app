import React, { useState } from 'react';
import UpdateForm from "./UpdateEvent";
import "./Events.css";

const Events = ({ events, deleteEvent, updateEvent }) => {

    const [edit, setEdit] = useState({
        id: null,
        obj: {
            eventTitle: '',
            eventPlace: '',
            eventTime: '',
            eventAddress: ''
        }
    })

    const submitUpdate = obj => {
        updateEvent(obj);
        setEdit({
            id: null,
            obj: {
                eventTitle: '',
                eventPlace: '',
                eventTime: '',
                eventAddress: ''
            }
        });
    };

    return(
        <ul>
            {
                events.map(obj => (
                    <li key={obj._id}>
                        {edit.id === obj._id ? 
                        (<UpdateForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate}/>) : 
                        (<>
                            <ul className="events-list___li">
                            <li>{obj.eventTitle}</li>
                            <li>{obj.eventPlace}</li>
                            <li>{obj.eventTime.replace('T', ' à ')}</li>
                            <li>{obj.eventAddress}</li>
                        </ul>
            
                        <div>
                            <button onClick={() => setEdit({
                                id: obj._id, 
                                obj: {
                                    eventTitle: obj.eventTitle,
                                    eventPlace: obj.eventPlace,
                                    eventTime: obj.eventTime,
                                    eventAddress: obj.eventAddress
                                }
                            })}>
                                <i className="fas fa-pencil-alt"/>
                            </button>
                            
                            <button className="del-btn" onClick={() => {deleteEvent(obj._id)}}>
                                <i className="fas fa-trash"/>
                            </button>
                        </div>
                        </>)}
                        
                    </li>)
                )
            }
        </ul>
    )
}

export default Events;
