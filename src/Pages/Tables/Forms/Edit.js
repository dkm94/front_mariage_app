import React from "react";
import Select from "../../../components/AsyncSelect/AsyncSelect";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import "../Tables.css";
import Table from "../Table";
import BlackButton from "../../../components/Buttons/Black/BlackButton";

const TableId = (props) => {
  const {
    tables,
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
    guests,
    // handleSubmit
  } = props;

  const filteredGuests = guests?.filter((guest) => guest.tableID === table._id);

  return (
    <>
      {edit.id === table._id ? (
        <li
          key={id}
          className="home-cards fade-in render-tables"
          id="table-form-style table-card"
          style={
            props.edit.id === props.table._id && { backgroundColor: `#FFF` }
          }
        >
          <div className="tbName">
            <form onSubmit={editTableName}>
              <input
                // ref={ref}
                type="text"
                className="shadow-none"
                name="name"
                onChange={handleUpdatedTable}
                value={input}
                style={{ background: "#fff", border: "1px solid lightgrey" }}
              />
            </form>
          </div>

          <Select
            table={table}
            tables={tables}
            setTables={setTables}
            guests={table.guestID}
          />

          <div
            style={{ marginBottom: "20px", marginTop: "20px", width: "100%" }}
          >
            {guests &&
              filteredGuests.map((guest) => {
                return (
                  <div key={guest._id} className="guest-del">
                    <span>{guest.name}</span>
                    <IconButton
                      onClick={() => {
                        deleteGuest(guest._id, table._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                );
              })}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <BlackButton
              onClick={(e) => {
                editTableName(e);
              }}
              text={"Enregistrer"}
            />
            <Button
              onClick={() => setEdit({ id: null })}
              style={{
                backgroundColor: "none",
                boxShadow: "none",
                border: "none",
                color: "#000",
                textTransform: "unset",
                fontSize: "1rem",
              }}
            >
              Annuler
            </Button>
          </div>
        </li>
      ) : (
        <Table
          table={table}
          edit={edit}
          setEdit={setEdit}
          getUpdatedId={getUpdatedId}
          deleteTable={deleteTable}
          guests={guests}
        />
      )}
    </>
  );
};

export default TableId;
