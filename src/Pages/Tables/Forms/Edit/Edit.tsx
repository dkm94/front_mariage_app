import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../Tables.css";

import React, { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { History } from "history";

import { TextField } from "@mui/material";

import { ClearButton, CustomButton } from "../../../../components/Buttons";
import MultipleSelect from "../../../../components/MultiSelect/MultiSelect";

import { deleteTable, updateTableWithGuests, updateTablesName } from "../../../../services";
import { GuestType, TableType } from "../../../../../types";

interface EditTableFormProps {
  tables: TableType[];
  tableId: string;
  edit: any;
  handleUpdatedTable: any;
  input: string;
  setTables: Dispatch<SetStateAction<TableType[]>>;
  guests: GuestType[];
  setGuests: Dispatch<SetStateAction<GuestType[]>>;
  setEdit: any;
  setisOpen: any;
  setMessage:Dispatch<SetStateAction<string | undefined>>;
  setMessageType: Dispatch<SetStateAction<"error" | "success" | undefined>>;
  mariageID: string;
  setTable: Dispatch<SetStateAction<string | null>>;
}

const EditTableForm = (props: EditTableFormProps) => {
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
    setisOpen,
    setMessage, 
    setMessageType,
    mariageID,
    setTable
  } = props;

  const history: History = useHistory();

  const [guestsIds, setGuestsIds] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  });

  useEffect(() => {
    if(input === ""){
        setIsDisabled(true);
    } else {
        setIsDisabled(false);
    }
  }, [input])
  
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    setTable(tableId);

    if(input === ""){
      setMessageType("error");
      setMessage("Le champ doit être rempli");
      return;
    }

    input.trim();
    
    const tablesResponse = await updateTableWithGuests({ id: tableId, guestIds: guestsIds });
    const updateNameResponse = await updateTablesName({ id: tableId, name: input });
    
    if (tablesResponse.success || updateNameResponse.success) {
      setMessageType("success");
      setMessage("Modifications enregistrées")
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
        if (guest && guestsIds.includes(guest?._id)) {
          guest.tableID = tableId;
        }
        return guest;
      });
      setGuests(updatedGuests); 

      setTimeout(() => {
        setMessageType(undefined);
        setMessage(undefined);
        setTable(null);
      }, 2000);

      const currentPosition: number = window.scrollY;
      history.replace(`/mariage/${mariageID}/tables`, { currentPosition });
    }
  }

  const deleteTableFn = async (e: MouseEvent, tableId:string): Promise<void> => {
    e.preventDefault();

    setTable(tableId);
    const response = await deleteTable({ id : tableId });
    const { message, success } = response;
    
    if(!success){
      setMessage(message);
      setMessageType("error");

      setTimeout(() => {
        setMessageType(undefined);
        setMessage(undefined);
        setTable(null);
      }, 2000);
      return;
    }
    
    setMessageType("success");
    setMessage(message);
    setTables([...tables].filter((table) => table._id !== tableId));

    setTimeout(() => {
      setMessageType(undefined);
      setMessage(undefined);
      setTable(null);
    }, 2000);

    const currentPosition = window.scrollY;
    history.replace(`/mariage/${mariageID}/tables`, { currentPosition });
  };

  const handleCancel = (): void => {
    setEdit(null);
    setisOpen(false);
    const currentPosition: number = window.scrollY;
    history.replace(`/mariage/${mariageID}/tables`, { currentPosition })
  }

  return (
    <div className="modal-child">
      <form onSubmit={handleSubmit} id="update-table-form">
        <TextField
          label="Table"
          size="small"
          required
          ref={inputRef}
          type="text"
          name="name"
          onChange={handleUpdatedTable}
          value={input}
          style={{
            width: "100%",
          }}
        />

          {/* TODO: actualiser la liste des invités sélectionnées si une table a été précédemment supprimée 
          et actualiser les invités deselectionnés précédement dans une autre table maintenant disponibles
          Problème de back ? */}
        <MultipleSelect guests={guests} setGuestsIds={setGuestsIds} edit={edit} />

        <div className="action-buttons">
          <CustomButton 
          text="Supprimer"
          variant="outlined"
          onClick={(e) => deleteTableFn(e, edit.id)}
          type="button"
          backgroundColor="none"
          width="48%" 
          borderRadius="5px"
          color="error"
          border={"1px solid #f44336"}
          />

          <CustomButton
          text="Enregistrer"
          type="submit"
          variant="contained" 
          width="48%"
          disabled={isDisabled}
          borderRadius="5px"
        />

        <ClearButton
          text={"Annuler"}     
          onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTableForm;
