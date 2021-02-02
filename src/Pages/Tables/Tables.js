import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import Card from "../../components/Tables/TablesBox";
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
        alert("submitted!")
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/tables/add", {name}, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                alert("Erreur", err)
                console.log(err)})
    }

    const table = tables.map((table) => <li key={table.id}>{table.name}</li>)
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
                <ul>
                    {table}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Tables);