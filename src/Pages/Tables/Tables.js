import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Select from "../../components/AsyncSelect/AsyncSelect";
import Button from "../../components/LargeButton/LargeButton";

import "./Tables.css";


const Tables = () => {
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({name:""});
   
    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/tables/", config)
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
                    const updatedTableList = [table, ...tables]
                    setTables(updatedTableList)
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGuest = (guest, table) => {
        console.log(guest);
        console.log(table);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.put(`/api/admin/tables/deleteGuest/${table}`, {guestID: guest}, config)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    let guests;
                    guests = tables.guestID;
                    guests.filter(guest => guest._id !== guest)
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
                    {tables.map(({name, _id, guestID}, i) => {
                        return <div key={i} data-id={_id} className="table-form">
                            <div className="table-name">
                                <span>{name}</span>
                            </div>
                            
                            <Select tableID={_id} tables={tables} setTables={setTables} guests={guestID}/>
                            
                            {guestID.map(guest => {
                                return <div key={guest._id} className="guest-del">
                                    <span>{guest.name}</span>
                                    <button><i className="fas fa-trash"
                                    onClick={() => {deleteGuest(guest._id, _id)}} /></button>
                                </div>
                            })}
                            <div className="delete-table">
                                <Button onClick={() => {deleteTable(_id, guestID)}} title="Supprimer la table"/>
                            </div>
                            
                        </div>
                    })}
            </div>
        </div>
    )
}

export default withRouter(Tables);