import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Select from "../../components/AsyncSelect/AsyncSelect";
import Button from "../../components/LargeButton/LargeButton";

import "./Tables.css";


const Tables = () => {
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({name:""});
    const [guests, setGuests] = useState([])
   
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/tables/")
            setTables(result.data)
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        const {value, name} = e.target;
        setTable(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/admin/tables/add", table)
            .then((res) => {
                if(res.data != null){
                    setTables([...tables, table])
                    setTable({name:""})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGuest = (guest, table) => {
        axios.put(`/api/admin/tables/deleteGuest/${table}`, {guestID: guest})
            .then((res) => {
                if(res.data != null){
                    setGuests(guests.filter(table => table._id !== table))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteTable = (id) => {
        axios.delete(`/api/admin/tables/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    // alert("La table a été supprimée.");
                    setTables(tables.filter(table => table._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="tables-container">
            <div className="tables">
                <div className="tables___bgimage"/>
                <div className="tables___title">
                    <div className="tables___title_style">
                        <h2>Les tables</h2>
                    </div>
                </div>

                <div className="tables___list">
                    <div className="table-form input-group mb-3">
                        <form onSubmit={handleSubmit} className="input-group mb-3">
                            <label>Créer une nouvelle table</label>
                            <input
                            type="text"
                            className="form-control"
                            name="name" 
                            value={table.name} 
                            onChange={handleChange}/>
                            <button 
                            type="submit"
                            className="btn btn-secondary"
                            id="button-addon2"
                            >OK</button>
                        </form>
                    </div>
                        {tables.length === 0 || null ? 
                        (<div className="block"><span>Vos tables ici.</span></div>) : 
                        (<ul className="get-tables container">
                            {tables.map((table, i) => {
                            return <li key={i} data-id={table._id} className="table-style">
                                <div className="table-name">
                                    <span>{table.name}</span>
                                </div>
                                
                                <Select table={table} tables={tables} setTables={setTables} guests={table.guestID}/>
                                {table.guestID.map(guest => {
                                    
                                    return <div key={guest._id} className="guest-del">
                                        <span>{guest.name}</span>
                                        <button><i className="fas fa-trash"
                                        onClick={() => {deleteGuest(guest._id, table._id)}} /></button>
                                    </div>
                                })}
                                <div className="delete-table">
                                    <Button handleClick={() => {deleteTable(table._id, table.guestID)}} title="Supprimer"/>
                                </div>
                                
                            </li>
                        })}
                        </ul>)
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Tables);