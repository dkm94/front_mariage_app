import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import Table from "./Table";
import AddTableForm from "./Forms/Add";
import { ScrollButtonContext } from "../../../src/App";
import axios from "axios";

import "./Tables.css";

const Tables = (props) => {
   
    const scrollBtn = useContext(ScrollButtonContext);
    // const loader = useContext(LoaderContext);

    const [searchValue, setSearchValue] = useState("");
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({})
    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })
    const [input, setInput] = useState('')

    const handleUpdatedTable = (e) => {
        setInput(e.target.value)
    }
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const [guests, setGuests] = useState([])
   
    // let dependency = JSON.stringify(tables);

    useEffect(() => {
        const fetchData = () => {
            axios.get("/api/admin/tables/")
            .then(result => {
                setTables(result.data)
            })
            .catch(err => err.json("Fail de load de ressource"))
        }
        fetchData();
    }, [table, guests])

    const addTable = newTable => {
        setTable(newTable)
        setTables([...tables, newTable])
    }

    const getUpdatedId = (tableId, tableName) => {
        setEdit({
            id: tableId,
            name: tableName
        })
        setInput(tableName)
    }

    const editTableName = (e) => {
        e.preventDefault()
        const updatedTableList = [...tables].map((table) => {
            if(table._id === edit.id) {
                table.name = input
            }
            return table
        })
        axios.post(`/api/admin/tables/edit/${edit.id}`, {name: input})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setTables(updatedTableList)
                        setEdit('')
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteGuest = (guest, table) => {
        axios.put(`/api/admin/tables/deleteGuest/${table}`, {guestID: guest})
            .then((res) => {
                if(res.data != null){
                    setGuests(guests.filter(table => table._id !== table))
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteTable = (e, tableId, guest) => {
       e.preventDefault();
        axios.delete(`/api/admin/tables/delete/${tableId}`)
            .then(res => {
                if(res.data != null) {
                    // const updateList = tables.filter(table => table._id !== tableId)
                    // setTables(updateList)
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="tables page-component">
            {scrollBtn}
            <div className="page-location"><div><Link to={"/"} >Dashboard</Link>{'>'} Tables</div></div>
            <div className="tables-container">
                <div className="titles mb-3">
                    <h2>Comment souhaitez-vous organiser votre plan de table ? </h2>
                </div>
            <div className="tables___bgimage"><div className="component-title"><h1>Les tables</h1></div></div>
                <Container style={{ padding: "2rem 4rem"}} fluid>
                    <Row>
                        <Col xs={12} sm={10} md={6} className="table-form">
                            <AddTableForm addTable={addTable} />
                        </Col>
                        <Col xs={12} sm={10} md={6} className="searchbar">
                            <SearchBar 
                            className="search__input"
                            type="text"
                            placeholder="Rechercher une table"
                            name="searchbar"
                            value={searchValue}
                            onChange={handleSearch}
                            />
                        </Col>
                    </Row>
                </Container>
                <div className="tables___list">
                    {tables.length === 0 || null ? 
                        (<div className="block" style={tables ? {display: "none"} : null}><span>Vos tables ici.</span></div>) : 
                        // loading === true ? loader :
                        (<div className="tables__block">
                            <ul className="get-tables">
                                {tables
                                .sort((a,b)=>{ return a.name > b.name ? 1 : - 1 })
                                .filter((table) => {
                                    return table.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
                                })
                                .map((table) =>
                                    <Table 
                                    tables={tables}
                                    table={table}
                                    id={table._id}
                                    key={table._id}
                                    edit={edit}
                                    editTableName={editTableName}
                                    handleUpdatedTable={handleUpdatedTable}
                                    input={input}
                                    setTables={setTables}
                                    guests={table.guestID}
                                    deleteGuest={deleteGuest}
                                    setEdit={setEdit}
                                    getUpdatedId={getUpdatedId}
                                    deleteTable={deleteTable}
                                    addTable={addTable}
                                    />
                                )}
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Tables);