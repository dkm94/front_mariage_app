import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../Tables.css";

import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";

import { ClearButton, CustomButton } from "../../../../components/Buttons";
import MultipleSelect from "../../../../components/MultiSelect/MultiSelect";

import { deleteTable, updateTableWithGuests, updateTablesName } from "../../../../services/tableRequests";
import RedButton from "../../../../components/Buttons/RedButton/RedButton";
import { useHistory } from "react-router";

const EditTableForm = (props) => {
  const {
    tables,
    tableId,
    edit,
    handleUpdatedTable,
    input,
    setTables,
    guests,
    setGuests,
    setEdit,
    // deleteTable,
    setisOpen,
    setMessage, 
    setMessageType,
    mariageID
  } = props;
  const history = useHistory();
  
  const [guestsIds, setGuestsIds] = useState<string[]>([])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const tablesResponse = await updateTableWithGuests({ id: tableId, guestIds: guestsIds });
    const updateNameResponse = await updateTablesName({ id: tableId, name: input });
    
    if (tablesResponse.success || updateNameResponse.success) {
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

      const updatedGuests = [...guests].map((guest) => {
        if (guestsIds.includes(guest.id)) {
          guest.tableID = tableId;
        }
        return guest;
      });
      setGuests(updatedGuests); 
      history.push(`/mariage/${mariageID}/tables`)
    }
  }

  const deleteTableFn = async (e, tableId:string) => {
    e.preventDefault();

    const response = await deleteTable({ id : tableId });
    const { message, success } = response;
    
    if(!success){
      setMessage(message)
      setMessageType("error")
      return;
    }
    
    setTables([...tables].filter((table) => table._id !== tableId))
  };

  return (
    <div className="modal-child">
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

        <div className="action-buttons">

          <RedButton 
          type={"submit"} 
          text={"Suprimer"} 
          handleClick={(e) => deleteTableFn(e, edit.id)} 
          />

          <CustomButton
            type={"submit"}
            text={"Enregistrer"}
            variant="contained"
            sx={{ flexGrow: 1 , "&:hover": { backgroundColor: "#333232" } }}
          />

          <ClearButton
            text={"Annuler"}     
            onClick={() => {
              setEdit(null);
              setisOpen(false);
              history.push(`/mariage/${mariageID}/tables`)
            }}
            sx={{ width: "100% !important" }}
            variant="outlined"    
            />
          
        </div>
      </form>
    </div>
  );
};

export default EditTableForm;
