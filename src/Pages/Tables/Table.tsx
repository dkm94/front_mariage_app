import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./Tables.css";
import { BlackButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import EditForm from "./Forms/Edit";
import { GuestType } from "../../../types";

const Table = ({
  tables,
  table,
  id,
  key,
  edit,
  handleUpdatedTable,
  input,
  setTables,
  guests,
  setEdit,
  getUpdatedId,
  isOpen,
  setisOpen,
  deleteTable 
}) => {
  
  const filteredGuests: GuestType[] = guests?.filter((guest: GuestType) => guest.tableID === table._id);

  return (
    <Grid2 xs={12} sm={4} md={3} className="render-tables">
      <div className="div-table-name-span">
        <span className="table-name-span">{table.name}</span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        {filteredGuests?.map((guest) => (
          <>
            <span style={{ color: "#7c7676", fontSize: "1rem" }}>{guest.name}</span>
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
      { edit?.id === table._id && <DefaultModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => {
          setisOpen(false);
        }}
        setEdit={setEdit}
        title="Gérer les invités/la table"
      >
        <EditForm
          tables={tables}
          table={table}
          tableId={table._id}
          key={table._id}
          edit={edit}
          handleUpdatedTable={handleUpdatedTable}
          input={input}
          setTables={setTables}
          guests={guests}
          setEdit={setEdit}
          getUpdatedId={getUpdatedId}
          deleteTable={deleteTable}
          isOpen={isOpen}
          setisOpen={setisOpen}
          filteredGuests={filteredGuests}
        />
      </DefaultModal>}
    </Grid2>
  );
};

export default Table;
