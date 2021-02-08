import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";


const Tables = () => {
    const [tables, setTables] = useState([])
    const [name, setName] = useState("")
   
    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/tables/", config)
            setTables(result.data)
            // console.log("updated")
        }
        fetchData();
        // console.log("mounted")
    }, [])

    const handleChange = (e) => {
        setName(e.target.value)
        console.log(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/tables/add", {name}, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="tables">
            <span>Tables</span>
            <div className="tables-form">
                <form onSubmit={handleSubmit}>
                    <label>Ajouter un groupe</label>
                    <input
                    type="text"
                    name="name" 
                    value={name} 
                    onChange={handleChange}/>
                    <button type="submit">OK</button>
                </form>
            </div>

            <div className="get-tables">
                    {tables.map(({name, _id, guestID}, i) => {
                        return <div key={i} data-id={_id}>
                            <span>{name}</span>
                            {guestID.map((guest, j) => {
                                console.log("guest ", guest)
                                return <div key={j}>
                                    <span>{guest.name}</span>
                                </div>
                            })}
                        </div>
                    })}
            </div>
        </div>
    )
}

export default withRouter(Tables);