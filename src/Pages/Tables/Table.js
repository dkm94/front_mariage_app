import React from "react";
import Select from "../../components/AsyncSelect/AsyncSelect";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomToggle from "../../components/Dots/Dots";
import Dropdown from "react-bootstrap/Dropdown";

const TableId = (props) => {
    const { tables, 
        table, 
        edit, 
        editTableName, 
        handleUpdatedTable, 
        input, 
        setTables, 
        // guests, 
        deleteGuest, 
        setEdit, 
        getUpdatedId, 
        deleteTable, 
        // handleSubmit 
    } = props;

    return(
        (
            <li data-id={props.table._id} className="tbStyle" style={props.edit.id === props.table._id ? {backgroundColor: `#F5F5F5`} : null}>
                <div className="tbName">
                    {edit.id === table._id ? 
                    (<form onSubmit={editTableName} className="mb-3">
                        <input
                        // ref={ref}
                        type="text"
                        className="shadow-none"
                        name="name" 
                        onChange={handleUpdatedTable}
                        value={input}
                        style={{background: "white"}}
                        />
                    </form>) : 
                    (<>
                        <span>{table.name}</span>
                    </>)
                    }
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
                <div className="custom-dropdown">
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
                </div>
            </li>
        
        )
    )
};


export default TableId;