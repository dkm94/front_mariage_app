import React, { useState, useRef, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ScrollButtonContext } from "../../../src/App";
import axios from "axios";
import Select from "../../components/AsyncSelect/AsyncSelect";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import MoreVertIcon from '@material-ui/icons//MoreVert';

import "./Tables.css";

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href=""
//       ref={ref}
//       onClick={e => {
//         e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children}
//       <span className="threedots" />
//     </a>
//   ));
const Tables = (props) => {
    console.log(props)
   
    const scrollBtn = useContext(ScrollButtonContext)

    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({name: ''})
    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })
    const [input, setInput] = useState('')

    const inputRef = useRef(null);

    const handleUpdatedTable = (e) => {
        setInput(e.target.value)
    }
    
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
        console.log(value)
        setNewTable(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/admin/tables/add", newTable)
            .then((res) => {
                // if(res.data != null){
                //     setTables([...tables, newTable])
                //     setNewTable({name:""})
                // }
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
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

    const deleteTable = (id) => {
        axios.delete(`/api/admin/tables/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setTables(tables.filter(table => table._id !== id))
                }
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)})
    }

    return(
        <div className="tables-container page-component">
            {scrollBtn}
            <div className="tables">
                <div className="tables___bgimage"/>
                <div className="tables___title">
                    <div className="tables___title_style">
                        <h1>Les tables</h1>
                    </div>
                </div>

                <div className="tables___list">
                    <div className="table-form add-form input-group mb-3">
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
                                ><i className="fas fa-check" /></button>
                            </div>
                        </form>
                    </div>
                        {tables.length === 0 || null ? 
                        (<div className="block"><span>Vos tables ici.</span></div>) : 
                        (<div className="tables__block">
                            <ul className="get-tables">
                                {tables.map((table, i) => {
                                    return <li key={i} data-id={table._id} className="table-style">
                                        {/* <Dropdown>
                                            <Dropdown.Toggle as={CustomToggle} />
                                            <Dropdown.Menu size="sm" title="">
                                            <Dropdown.Header>Options</Dropdown.Header>
                                            <Dropdown.Item>abcd</Dropdown.Item>
                                            <Dropdown.Item>erty</Dropdown.Item>
                                            <Dropdown.Item>hnjm</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                        
                                        <div className="table-name">
                                            {edit.id === table._id ? 
                                            (<form onSubmit={editTableName} className="mb-3">
                                                <input
                                                type="text"
                                                className="form-control shadow-none"
                                                name="name" 
                                                onChange={handleUpdatedTable}
                                                value={input}
                                                ref={inputRef}
                                                />
                                                <button 
                                                type="submit"
                                                className="btn shadow-none"
                                                id="button-addon2"
                                                onClick={(e) => editTableName(e)}
                                                >
                                                    <i className="fas fa-check"/>
                                                </button>
                                                <button className="undo-btn shadow-none" onClick={() => setEdit({id: null})}>
                                                    <i className="fas fa-undo"/>
                                                </button>
                                            </form>) : 
                                            (<>
                                                <span>{table.name}</span>
                                                <button 
                                                    onClick={() => getUpdatedId(table._id, table.name)}
                                                    className=""
                                                >
                                                    <i className="fas fa-pencil-alt"/>
                                                </button>
                                            </>)
                                            }
                                        </div>
                                    
                                        <Select table={table} tables={tables} setTables={setTables} guests={table.guestID}/>

                                        <div style={{marginBottom: '20px', marginTop: '20px', width: "100%"}}>
                                            {table.guestID.map(guest => {
                                                
                                                return <div key={guest._id} className="guest-del">
                                                    <span>{guest.name}</span>
                                                    <button 
                                                        onClick={() => {deleteGuest(guest._id, table._id)}} 
                                                        className=""
                                                    >
                                                        <i className="fas fa-trash"/>
                                                    </button>
                                                </div>
                                            })}
                                        </div>
                                        <button 
                                            onClick={() => {deleteTable(table._id, table.guestID)}}
                                            className="delete-table shadow-none"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                     
                                    </li>
                                })}
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Tables);