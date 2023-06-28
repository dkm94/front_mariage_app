import React from "react";
import Select from "../../../components/AsyncSelect/AsyncSelect";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";
import "../Tables.css";
import Table from "../Table";
import BlackButton from "../../../components/Buttons/Black/BlackButton";

const EditTableForm = (props) => {
  const {
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
    filteredGuests,
  } = props;

  const tableGuests = guests.filter((guest) => guest.tableID === edit.id);

  return (
    <li key={id} style={{ listStyle: "none" }}>
      <div
        style={{
          marginBottom: "2rem",
          paddingRight: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <h1
          style={{
            textAlign: "start",
            fontSize: "1.5rem",
            paddingLeft: "30px",
          }}
        >
          Gérer les invités / gérer la table
        </h1>
      </div>

      <div style={{ padding: "5px 30px" }}>
        <div className="tbName">
          <form onSubmit={editTableName}>
            <TextField
              label="Table"
              size="small"
              // ref={ref}
              type="text"
              name="name"
              onChange={handleUpdatedTable}
              value={input}
              style={{
                width: "100%",
              }}
            />
          </form>
        </div>

        <Select
          table={table}
          tables={tables}
          setTables={setTables}
          guests={table.guestID}
          tableId={edit.id}
        />

        <div
          style={{
            marginBottom: "40px",
            marginTop: "40px",
            width: "100%",
          }}
        >
          {guests &&
            tableGuests.map((guest) => {
              return (
                <div key={guest._id} className="guest-del">
                  <span>{guest.name}</span>
                  <IconButton
                    onClick={() => {
                      deleteGuest(guest._id, table._id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              );
            })}
        </div>
      </div>
      <div className="guest-card__form__button-container">
        <Button
          color="error"
          variant="outlined"
          onClick={(e) => deleteTable(e, edit.id)}
        >
          Supprimer
        </Button>

        <div>
          <Button
            onClick={() => {
              setEdit({ id: null });
              setisOpen(false);
            }}
            variant="outline"
            style={{
              color: "grey",
              textTransform: "unset",
              fontSize: "1rem",
            }}
          >
            Annuler
          </Button>
          <BlackButton
            onClick={(e) => {
              editTableName(e);
            }}
            // type={"submit"}
            text={"Enregistrer"}
            variant="contained"
            style={{ borderRadius: "5px" }}
          />
        </div>
      </div>
    </li>
  );
};

export default EditTableForm;
