import React, { useState } from "react";
import Select from "../../../components/AsyncSelect/AsyncSelect";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";
import "../Tables.css";
import { BlackButton } from "../../../components/Buttons";
import { GuestType, TableType } from "../../../../types";
import MultipleSelect from "../../../components/MultiSelect/MultiSelect";
import formatArray from "../../../helpers/formatDefault";
import { updateTableWithGuests, updateTablesName } from "../../../services/tables/tableRequests";

const EditTableForm = (props) => {
  const {
    tables,
    table,
    tableId,
    edit,
    handleUpdatedTable,
    input,
    setTables,
    guests,
    setEdit,
    deleteTable,
    setisOpen,
    filteredGuests
  } = props;
  
  const [guestsIds, setGuestsIds] = useState<string[]>([])
  const formattedGuests = formatArray(guests);
  

  // function 2: handle table name
  // const editTableName = async (e) => {
  //   e.preventDefault();
  //   const updatedTableList = [...tables].map((table) => {
  //     if (table._id === edit?.id) {
  //       table.name = input;
  //     }
  //     return table;
  //   });
  //   await axios
  //     .post(`/api/admin/tables/edit/${edit?.id}`, { name: input })
  //     .then((res) => {
  //       if (res.data != null) {
  //         setTimeout(() => {
  //           setTables(updatedTableList);
  //           setEdit(null);
  //         }, 1500);
  //       }
  //     })
  //     .catch((err) => {
  //       // todo: handle error
  //       console.log(err);
  //     });
  // };

  const handleSubmit = async (e) => { // ajouter les guestsIds à guestID dans Table(côté backend)
    e.preventDefault();
    console.log(input);
    console.log(guestsIds);
    // debugger;
    const tablesResponse = await updateTableWithGuests({ id: tableId, guestIds: guestsIds });
    const updateNameResponse = await updateTablesName({ id: tableId, name: input });

    if (tablesResponse.success && updateNameResponse.success) {
      setGuestsIds([]);
      setEdit(null);
      setisOpen(false);
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

            <MultipleSelect guests={formattedGuests} tableId={tableId} setGuestsIds={setGuestsIds} edit={edit} />

            <div className="guest-card__form__button-container">
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
                    setEdit(null);
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
                  type={"submit"}
                  text={"Enregistrer"}
                  variant="contained"
                  style={{ borderRadius: "5px", padding: "6px 16px" }}
                />
              </div>
            </div>
          </form>
        </div>


        {/* <div
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
        </div> */}
      </div>
      
    </li>
  );
};

export default EditTableForm;
