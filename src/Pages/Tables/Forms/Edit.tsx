import React from "react";
import Select from "../../../components/AsyncSelect/AsyncSelect";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";
import "../Tables.css";
import { BlackButton } from "../../../components/Buttons";
import { GuestType, TableType } from "../../../../types";

const EditTableForm = (props) => {
  const {
    tables,
    table,
    id,
    edit,
    editTableName,
    handleUpdatedTable,
    input,
    setTables,
    guests,
    deleteGuest,
    setEdit,
    deleteTable,
    setisOpen,
  } = props;

  const tableGuests: GuestType[] = guests.filter((guest: GuestType) => guest.tableID === edit.id);

  const handleClick = (e, guest: GuestType, table: TableType) => {
    const selectedGuest: GuestType = guests.find((selected: GuestType) => selected._id === guest._id);
    if(selectedGuest){
      deleteGuest(e, selectedGuest, table);
    }
  }

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
              required
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
              console.log("🚀 ~ file: Edit.tsx:84 ~ tableGuests.map ~ guest:", guest)
              return (
                <div key={guest._id} className="guest-del">
                  <span>{guest.name}</span>
                  <IconButton
                    style={{
                      backgroundColor: "darkred",
                      borderRadius: "5px",
                      color: "#fff",
                    }}
                    onClick={(e) => handleClick(e, guest, table)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              );
            })}
        </div>
      </div>
      <div className="guest-card__form__button-container">
        {/* <Button
          color="error"
          variant="contained"
          onClick={(e) => deleteTable(e, edit.id)}
        >
          Supprimer
        </Button> */}

        <IconButton
          onClick={(e) => deleteTable(e, edit.id)}
          style={{ backgroundColor: "darkred", borderRadius: "5px" }}
        >
          <DeleteIcon style={{ color: "#F4F4F4" }} />
          <span style={{ color: "#F4F4F4" }}>Supprimer</span>
        </IconButton>

        <div>
          <Button
            onClick={() => {
              setEdit({ id: "" });
              setisOpen(false);
            }}
            variant="outlined"
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
            style={{ borderRadius: "5px", padding: "6px 16px" }}
          />
        </div>
      </div>
    </li>
  );
};

export default EditTableForm;
