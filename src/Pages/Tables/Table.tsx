import "./Tables.css";

import React from "react";
import { useHistory, useParams } from "react-router";

import { CustomButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import EditForm from "./Forms/Edit/Edit";

import { useCurrentUser } from "../../ctx/userCtx";
import { TableProps } from "../../../types";

const Table = (props: TableProps) => {
  const { 
    tables, 
    table, 
    id, 
    edit, 
    handleUpdatedTable, 
    input, 
    setTables, 
    guests, 
    setGuests, 
    setEdit, 
    getUpdatedId, 
    isOpen, 
    setisOpen, 
    setMessage, 
    setMessageType, 
    setTable,
    checked,
    setChecked
  } = props;

  const history = useHistory();

  const { id: tableId } = useParams<{id: string}>();
  const { mariageID } = useCurrentUser();

  const returnName = (id: string) => {
    const guest = guests?.find((guest) => guest?._id === id);
    return guest?.name;
  }

  const handleCloseModal = () => {
    setEdit(null);
    setisOpen(false);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/tables`, { currentPosition });
  }

  return (
    <div className="render-tables" key={id}>
      <div className="div-table-name-span">
        <span className="table-name-span">{table.name}</span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        <ul style={{ padding: "0"}}>
          {table?.guestID?.map((guestId: string) => <li style={{ listStyle: "none"}} key={guestId}>{returnName(guestId)}</li>)}
        </ul>
      </div>

      {checked && <div className="table-card__button-container">
        <CustomButton
          onClick={() => {
            getUpdatedId(table._id, table.name);
            setisOpen(true);
            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/tables/edit/${tableId}`, { currentPosition });
          }}
          variant={"contained"}
          text="Modifier"
          sx={{ "&:hover": { backgroundColor: "#333232" } }}
        />
      </div>}
      { edit?.id === table._id && <DefaultModal
        open={isOpen}
        setOpen={setChecked}
        close={handleCloseModal}
        setEdit={setEdit}
        title="Gérer les invités/la table"
        selectedId={edit?.id}
      >
        <EditForm
          tables={tables}
          tableId={table._id}
          key={table._id}
          edit={edit}
          handleUpdatedTable={handleUpdatedTable}
          input={input}
          setTables={setTables}
          guests={guests}
          setGuests={setGuests}
          setEdit={setEdit}
          setOpen={setChecked}
          setMessage={setMessage}
          setMessageType={setMessageType}
          mariageID={mariageID}
          setTable={setTable}
        />
      </DefaultModal>}
    </div>
  );
};

export default Table;
