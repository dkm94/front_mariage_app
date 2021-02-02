import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import Card from "../../components/Tables/TablesBox";
import axios from "axios";


const Tables = () => {
    const [tables, setTables] = useState([])
   
    useEffect(() => {
        const fetchData = async () => {
            console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/tables/", config)
            setTables(result.data)
            console.log("updated")
        }
        fetchData();
        console.log("mounted")
    }, [])

    const table = tables.map((table) => <li key={table.id}>{table.name}</li>)
    return(
        <div className="tables">
            <span>Tables</span>
            <ul>
                {table}
            </ul>
        </div>
    )
}

export default withRouter(Tables);