import React from "react";
import Select from "../../../components/AsyncSelect/AsyncSelect";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomToggle from "../../../components/Dots/Dots";
import Dropdown from "react-bootstrap/Dropdown";
import "../Tables.css";
import Table from "../Table";

const TableId = (props) => {
    const { tables, 
        table, 
        id,
        edit, 
        editTableName, 
        handleUpdatedTable, 
        input, 
        setTables, 
        deleteGuest, 
        setEdit, 
        getUpdatedId, 
        deleteTable, 
        // handleSubmit 
    } = props;
    
    return(
        <>
            {edit.id === table._id ? (
                <li key={id} className="home-cards fade-in render-tables" id="table-form-style" style={props.edit.id === props.table._id ? {backgroundColor: `#F5F5F5`} : null}>
                <div className="tbName">
                    <form onSubmit={editTableName} className="mb-3">
                        <input
                        // ref={ref}
                        type="text"
                        className="shadow-none"
                        name="name" 
                        onChange={handleUpdatedTable}
                        value={input}
                        style={{background: "white"}}
                        />
                    </form>
                </div>
            
                <Select table={table} tables={tables} setTables={setTables} guests={table.guestID}/>
        
                <div style={{marginBottom: '20px', marginTop: '20px', width: "100%"}}>
                    {table.guestID ? table.guestID.map(guest => {
                        return <div key={guest._id} className="guest-del">
                            <span>{guest.name}</span>
                            <button 
                                onClick={() => {deleteGuest(guest._id, table._id)}} 
                                className=""
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    }) : null}
                </div>
                {/* <div className="custom-dropdown dots-menu-edit">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu size="sm" title="">
                            {edit.id ? (<>
                                <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => {editTableName(e)}}>Valider</Dropdown.Item>
                            </>) : (<>
                                <Dropdown.Item onClick={() => getUpdatedId(table._id, table.name)}>Modifier</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => {
                                    deleteTable(e, table._id, table.guestID)}}>
                                    Supprimer</Dropdown.Item>
                            </>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div> */}
                <div style={{ marginBottom: "20px", display: "flex", width: "100%", justifyContent: "space-evenly"}}>
                    <button onClick={() => setEdit({id: null})} className="btn-style edit-table-btn" ><i className="fas fa-undo"></i></button>
                    <button onClick={(e) => {editTableName(e)}} className="btn-style edit-table-btn"><i className="fas fa-check"></i></button>
                </div>
            </li>
            ) : (
                <Table table={table} edit={edit} setEdit={setEdit} getUpdatedId={getUpdatedId} deleteTable={deleteTable} />
            )}
        </>
    )
};


export default TableId;