import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Tables.css";
import { BlackButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/DefaultModal";
import EditForm from "./Forms/Edit";

const Table = ({
  tables,
  table,
  id,
  key,
  edit,
  editTableName,
  handleUpdatedTable,
  input,
  setTables,
  guests,
  deleteGuest,
  setEdit,
  getUpdatedId,
  deleteTable,
  addTable,
  isOpen,
  setisOpen,
}) => {
  
  const filteredGuests = guests?.filter((guest) => guest.tableID === table._id);

  return (
    <Grid2 xs={12} sm={4} md={3} className="render-tables">
      <div className="div-table-name-span">
        <span className="table-name-span">{table.name}</span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        {filteredGuests?.map((guest) => (
          <>
            <span style={{ color: "#7c7676", fontSize: "1.2rem" }}>{guest.name}</span>
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
        <BlackButton
          onClick={() => {
            getUpdatedId(table._id, table.name);
            setisOpen(true);
          }}
          variant={"contained"}
          text="Modifier"
        />
      </div>
      <DefaultModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => {
          setisOpen(false);
        }}
      >
        <EditForm
          tables={tables}
          table={table}
          id={table._id}
          key={table._id}
          edit={edit}
          editTableName={editTableName}
          handleUpdatedTable={handleUpdatedTable}
          input={input}
          setTables={setTables}
          guests={guests}
          deleteGuest={deleteGuest}
          setEdit={setEdit}
          getUpdatedId={getUpdatedId}
          deleteTable={deleteTable}
          addTable={addTable}
          isOpen={isOpen}
          setisOpen={setisOpen}
          filteredGuests={filteredGuests}
        />
      </DefaultModal>
    </Grid2>
  );
};

export default Table;
