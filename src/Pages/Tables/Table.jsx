import React from 'react';
import { Button } from '@material-ui/core';
import "./Tables.css";


const Table = ({ table, getUpdatedId, guests }) => {
    console.log(guests)
  return (
    <div className='home-cards render-tables'>
        
        <div className='div-table-name-span'>
            <span className='table-name-span'>{table.name}</span>
        </div>
        <div style={{ marginBottom: "60px"}}>
        {guests?.map(guest => <><span style={{ color: "#7c7676"}}>{guest.name}</span><br/></>)}
        </div>
        {/* <div className="custom-dropdown dots-menu">
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item onClick={() => getUpdatedId(table._id, table.name)}>Modifier</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {
                        deleteTable(e, table._id, table.guestID)}}>
                        Supprimer</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div> */}
        <div className='dashbord-view-details' >
            <Button onClick={() => getUpdatedId(table._id, table.name)} style={{ backgroundColor: "#efebe9" }} >Modifier</Button>
      </div>
    </div>
  )
}

export default Table