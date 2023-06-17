import React from "react";
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Tables.css";

const Table = ({ table, getUpdatedId, guests }) => {
  const filteredGuests = guests?.filter((guest) => guest.tableID === table._id);

  return (
    <Grid2 xs={12} sm={4} md={3} className="home-cards render-tables">
      <div className="div-table-name-span">
        <span className="table-name-span">{table.name}</span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        {filteredGuests?.map((guest) => (
          <>
            <span style={{ color: "#7c7676" }}>{guest.name}</span>
            <br />
          </>
        ))}
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
      <div className="table-card__button-container">
        <Button onClick={() => getUpdatedId(table._id, table.name)}>
          Modifier
        </Button>
      </div>
    </Grid2>
  );
};

export default Table;
