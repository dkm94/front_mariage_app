import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import { withRouter } from "react-router-dom";
import { ScrollButtonContext } from "../../../src/App";
import axios from "axios";
// import Select from "../../components/AsyncSelect/AsyncSelect";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import CustomToggle from "../../components/Dots/Dots";
// import Dropdown from "react-bootstrap/Dropdown";
import Table from "./Table";
import { LoaderContext } from "../../../src/App";

import "./Tables.css";

const Tables = (props) => {
   
    const scrollBtn = useContext(ScrollButtonContext);
    const loader = useContext(LoaderContext);

    const [searchValue, setSearchValue] = useState("");
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({name: ''})
    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('')

    const inputRef = useRef(null);

    const handleUpdatedTable = (e) => {
        setInput(e.target.value)
    }
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const [guests, setGuests] = useState([])
   
    let dependency = JSON.stringify(tables);

    useEffect(() => {
        const fetchData = () => {
            axios.get("/api/admin/tables/")
            .then(result => {
                setTables(result.data)
            })
            .catch(err => err.json("Fail de load de ressource"))
        }
        fetchData();
    }, [dependency])

    const handleChange = (e) => {
        const {value, name} = e.target;
        setNewTable(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("/api/admin/tables/add", newTable)
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setTables([...tables, newTable])
                        setNewTable({name:""})
                    }, 500)
                }
            })
            .catch((err) => {
                console.log(err)})
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

    // const result = tables.sort((a,b)=>{
    //     return a.name > b.name ? 1 : - 1
    //     }
    // )

    return(
        <div className="tables page-component">
            {scrollBtn}
            <div className="tables-container">
                <div className="tables___bgimage" />
                <div className="titles mb-3">
                    <h1>Comment souhaitez-vous organiser votre plan de table ? </h1>
                </div>
                <Container style={{ padding: "2rem 4rem"}} fluid>
                    <Row>
                        <Col xs={8} md={6} className="table-form">
                            <form onSubmit={handleSubmit} className="input-group mb-3">
                                <div>
                                    <input
                                    type="text"
                                    className="form-control shadow-none"
                                    name="name" 
                                    placeholder="Nom/Numéro de la table"
                                    value={newTable.name} 
                                    onChange={handleChange}/>
                                    <button 
                                    type="submit"
                                    className="btn shadow-none check-btn"
                                    id="button-addon2"
                                    ><i className="fas fa-long-arrow-alt-right" /></button>
                                </div>
                            </form>
                        </Col>
                        <Col xs={8} md={6} className="searchbar">
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
                        loading === true ? loader :
                        (<div className="tables__block">
                            <ul className="get-tables">
                                {tables
                                .filter((table) => {
                                    return table.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
                                })
                                .map((table, i) =>
                                    <Table 
                                    tables={tables}
                                    table={table}
                                    key={i}
                                    edit={edit}
                                    editTableName={editTableName}
                                    // ref={inputRef}
                                    handleUpdatedTable={handleUpdatedTable}
                                    input={input}
                                    setTables={setTables}
                                    guests={table.guestID}
                                    deleteGuest={deleteGuest}
                                    setEdit={setEdit}
                                    getUpdatedId={getUpdatedId}
                                    deleteTable={deleteTable}
                                    handleSubmit={handleSubmit}
                                    />
                                    // return <li key={i} data-id={table._id} className="table-style" style={edit.id === table._id ? {backgroundColor: `#F5F5F5`} : null}>
                                    //     <div className="table-name">
                                    //         {edit.id === table._id ? 
                                    //         (<form onSubmit={editTableName} className="mb-3">
                                    //             <input
                                    //             ref={inputRef}
                                    //             type="text"
                                    //             className="shadow-none"
                                    //             name="name" 
                                    //             onChange={handleUpdatedTable}
                                    //             value={input}
                                    //             style={{background: "white"}}
                                    //             />
                                    //             {/* <button 
                                    //             type="submit"
                                    //             className="btn shadow-none"
                                    //             id="button-addon2"
                                    //             onClick={(e) => editTableName(e)}
                                    //             >
                                    //                 <i className="fas fa-check"/>
                                    //             </button>
                                    //             <button className="undo-btn shadow-none" onClick={() => setEdit({id: null})}>
                                    //                 <i className="fas fa-undo"/>
                                    //             </button> */}
                                    //         </form>) : 
                                    //         (<>
                                    //             <span>{table.name}</span>
                                    //         </>)
                                    //         }
                                    //     </div>
                                    
                                    //     <Select table={table} tables={tables} setTables={setTables} guests={table.guestID}/>

                                    //     <div style={{marginBottom: '20px', marginTop: '20px', width: "100%"}}>
                                    //         {table.guestID.map(guest => {
                                                
                                    //             return <div key={guest._id} className="guest-del">
                                    //                 <span>{guest.name}</span>
                                    //                 <button 
                                    //                     onClick={() => {deleteGuest(guest._id, table._id)}} 
                                    //                     className=""
                                    //                 >
                                    //                     <i className="fas fa-times"></i>
                                    //                 </button>
                                    //             </div>
                                    //         })}
                                    //     </div>
                                    //     <div className="custom-dropdown">
                                    //         <Dropdown>
                                    //             <Dropdown.Toggle as={CustomToggle} />
                                    //             <Dropdown.Menu size="sm" title="">
                                    //                 {edit.id ? (<>
                                    //                     <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                    //                     <Dropdown.Item onClick={(e) => {editTableName(e)}}>Valider</Dropdown.Item>
                                    //                 </>) : (<>
                                    //                     <Dropdown.Item onClick={() => getUpdatedId(table._id, table.name)}>Modifier</Dropdown.Item>
                                    //                     <Dropdown.Item onClick={(e) => {
                                    //                         deleteTable(e, table._id, table.guestID)}}>
                                    //                         Supprimer</Dropdown.Item>
                                    //                 </>)}
                                    //             </Dropdown.Menu>
                                    //         </Dropdown>
                                    //     </div>
                                    // </li>
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