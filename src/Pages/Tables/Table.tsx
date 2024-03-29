import "./Tables.css";

import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useHistory, useParams } from "react-router";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { CustomButton } from "../../components/Buttons";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import EditForm from "./Forms/Edit/Edit";

import { useCurrentUser } from "../../ctx/userCtx";
import { TableType, GuestType } from "../../../types";

type EditType = {
  id: string;
  name: string;
}
interface TableProps {
  tables: TableType[];
  table: TableType;
  id: string;
  edit: EditType | null;
  handleUpdatedTable: (e: ChangeEvent<HTMLInputElement>) => void;
  input: string;
  setTables: Dispatch<SetStateAction<TableType[]>>;
  guests: GuestType[];
  setGuests: Dispatch<SetStateAction<GuestType[]>>;
  setEdit: Dispatch<SetStateAction<EditType | null>>;
  getUpdatedId: (tableId: string, tableName: string) => void;
  isOpen: boolean;
  setisOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  setTable: Dispatch<SetStateAction<string | null>>;
}

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
    setTable } = props;

  const history = useHistory();

  const { id: tableId } = useParams<{id: string}>();
  const { mariageID } = useCurrentUser();

  const returnName = (id: string) => {
    const guest = guests?.find((guest) => guest?._id === id);
    return guest?.name;
  }

  return (
    <Grid2 xs={12} sm={4} md={3} className="render-tables" key={id}>
      <div className="div-table-name-span">
        <span className="table-name-span">{table.name}</span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        <ul style={{ padding: "0"}}>
          {table?.guestID?.map((guestId: string) => <li key={guestId}>{returnName(guestId)}</li>)}
        </ul>
      </div>

      <div className="table-card__button-container">
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
      </div>
      { edit?.id === table._id && <DefaultModal
        open={isOpen}
        setOpen={setisOpen}
        close={() => {
          setEdit(null);
          setisOpen(false);
          const currentPosition: number = window.scrollY;
          history.replace(`/mariage/${mariageID}/tables`, { currentPosition });
        }}
        setEdit={setEdit}
        title="Gérer les invités/la table"
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
          setisOpen={setisOpen}
          setMessage={setMessage}
          setMessageType={setMessageType}
          mariageID={mariageID}
          setTable={setTable}
        />
      </DefaultModal>}
    </Grid2>
  );
};

export default Table;
