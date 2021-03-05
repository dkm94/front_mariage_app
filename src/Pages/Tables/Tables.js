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

    // const handleChange = (e) => {
    //     setTable(e.target.value)
    // }

    const handleChange = (e) => {
        const {value, name} = e.target;
        setTable(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (table) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/tables/add", {name: table}, config)
            .then((res) => {
                if(res.data != null){
                    setTables([...tables].concat(table))
                    setTable({name:""})
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGuest = (guest, table) => {
        console.log(guest);
        console.log(table);
        // console.log(guests)
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.put(`/api/admin/tables/deleteGuest/${table}`, {guestID: guest}, config)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    console.log(table)
                    console.log(guest)
                    setGuests(guests.filter(table => table._id !== table))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteTable = (id) => {
        console.log(id);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.delete(`/api/admin/tables/delete/${id}`, config)
            .then(res => {
                if(res.data != null) {
                    alert("La table a été supprimée.");
                    setTables(tables.filter(table => table._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="tables-container">
            <div className="tables container">
                <div className="tables-form">
                    <form onSubmit={() => handleSubmit(table.name)}>
                        <label>Créer une nouvelle table</label><br />
                        <input
                        type="text"
                        name="name" 
                        value={table.name} 
                        onChange={handleChange}/>
                        <button type="submit">OK</button>
                    </form>
                </div>

                <div className="get-tables">
                        {tables.length === 0 || null ? <div className="block"><span>Vos tables ici.</span></div> : tables.map((table, i) => {
                            return <div key={i} data-id={table._id} className="table-form">
                                <div className="table-name">
                                    <span>{table.name}</span>
                                </div>
                                
                                {/* {console.log("log", guestID)} */}
                                <Select table={table} tables={tables} setTables={setTables} guests={table.guestID}/>
                                {table.guestID.map(guest => {
                                    
                                    return <div key={guest._id} className="guest-del">
                                        <span>{guest.name}</span>
                                        <button><i className="fas fa-trash"
                                        onClick={() => {deleteGuest(guest._id, table._id)}} /></button>
                                    </div>
                                })}
                                <div className="delete-table">
                                    <Button handleClick={() => {deleteTable(table._id, table.guestID)}} title="Supprimer la table"/>
                                </div>
                                
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Tables);