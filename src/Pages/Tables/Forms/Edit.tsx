import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../Tables.css";

import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";

import { BlackButton } from "../../../components/Buttons";
import MultipleSelect from "../../../components/MultiSelect/MultiSelect";

import { updateTableWithGuests, updateTablesName } from "../../../services/tables/tableRequests";

const EditTableForm = (props) => {
  const {
    tables,
    tableId,
    edit,
    handleUpdatedTable,
    input,
    setTables,
    guests,
    setEdit,
    deleteTable,
    setisOpen,
  } = props;
  
  const [guestsIds, setGuestsIds] = useState<string[]>([])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const tablesResponse = await updateTableWithGuests({ id: tableId, guestIds: guestsIds });
    const updateNameResponse = await updateTablesName({ id: tableId, name: input });
    
    if (tablesResponse.success && updateNameResponse.success) {
      setGuestsIds([]);
      setEdit(null);
      setisOpen(false);

      const updatedTables = [...tables].map((table) => {
        if (table._id === tableId) {
          table.name = input;
          table.guestID = guestsIds
        }
        return table;
      });
      setTables(updatedTables);
    }
  }

  return (
    <li key={tableId} style={{ listStyle: "none" }}>

      <div style={{ padding: "5px 30px", marginTop: "50px" }}>
        <div className="tbName">
          <form onSubmit={handleSubmit}>
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

            <MultipleSelect guests={guests} setGuestsIds={setGuestsIds} edit={edit} />

            <div className="guest-card__form__button-container">
              <IconButton
                onClick={(e) => deleteTable(e, edit.id)}
                style={{ backgroundColor: "darkred", borderRadius: "5px", flexGrow: 1 }}
              >
                <DeleteIcon style={{ color: "#F4F4F4" }} />
                <span style={{ color: "#F4F4F4" }}>Supprimer</span>
              </IconButton>

              <BlackButton
                type={"submit"}
                text={"Enregistrer"}
                variant="contained"
                style={{ borderRadius: "5px", padding: "6px 16px", flexGrow: 1 }}
              />

              <Button
                onClick={() => {
                  setEdit(null);
                  setisOpen(false);
                }}
                variant="outlined"
                style={{
                  color: "grey",
                  textTransform: "unset",
                  fontSize: "1rem",
                  width: "100%",
                  borderColor: "#e4e8e8",
                }}
              >
                Annuler
              </Button>

              
            </div>
          </form>
        </div>
      </div>
    </li>
  );
};

export default EditTableForm;
