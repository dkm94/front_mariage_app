import "./Tables.css";

import React, { useState, ChangeEvent } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import { Box } from "@mui/material";
import Grow from "@mui/material/Grow";

import { GuestType, TableType } from "../../../types";
import { getGuests } from "../../services/guestRequests";
import { getTables } from "../../services/tableRequests";
import { useFetch } from "../../hooks";

import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import AddTableForm from "./Forms/Add/Add";
import SearchBar from "../Guests/SearchBar/SearchBar";
import { AddButton, SwitchEditMode } from "../../components/Buttons";
import TableList from "./Tablelist/TableList";
import DefaultModal from "../../components/Modals/Default/DefaultModal";
import { useCurrentUser } from "../../ctx/userCtx";

type EditType = {
  id: string;
  name: string;
}

const Tables = (props) => {
  const history = useHistory();
  const{ firstPerson, secondPerson, mariageID } = useCurrentUser();

  const [searchValue, setSearchValue] = useState<string>("");
  const [edit, setEdit] = useState<EditType | null>(null);
  const [input, setInput] = useState<string>("");
  const [table, setTable]= useState<any>(null);

  const [isOpen, setisOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const { 
    data: tables, 
    setData: setTables, 
    loading: loadingTables, 
    message: tableMessage, 
    messageType: tableTypeMessage,
    setMessage: setMessageTable,
    setMessageType: setMessageTypeTable } = useFetch<void, TableType[]>(getTables, []);

  const { 
    data: guests, 
    setData: setGuests, 
    message: guestMessage, 
    messageType: guestTypeMessage } = useFetch<void, GuestType[]>(getGuests, []);

    const orderedGuests = guests
    ?.slice()
    .sort((a, b) => {
      const nameA = a?.name || '';
      const nameB = b?.name || '';
      return nameA.localeCompare(nameB);
    });

  const handleUpdatedTable = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const getUpdatedId = (tableId: string, tableName: string): void => {
    setEdit({
      id: tableId,
      name: tableName,
    });
    setInput(tableName);
  };

  function handleModal(){
    setOpenModal(!openModal);
  }

  return (
    <ContentLayout 
      loading={loadingTables}
      title={"Comment souhaitez-vous organiser votre plan de table ?"}
      src={"tables"}
      message={tableMessage || guestMessage} 
      messageType={tableTypeMessage || guestTypeMessage} 
      id={table || ""}    
    >
      <div className="section-action-box">
        <AddButton onClick={handleModal} />
        {openModal && <DefaultModal
        close={() => {
            setOpenModal(false);
            const currentPosition: number = window.scrollY;
            history.replace(`/mariage/${mariageID}/tables`, { currentPosition } )
        }}
        setOpen={handleModal}
        title={"Nouvelle table"}
        >
          <AddTableForm 
          tables={tables} 
          setTables={setTables} 
          setMessage={setMessageTable} 
          setMessageType={setMessageTypeTable}
          setOpenModal={setOpenModal} 
          />
        </DefaultModal>}
        <SearchBar
          className="search__input"
          type="text"
          placeholder="Rechercher une table"
          name="searchbar"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      <Grow in={!loadingTables} timeout={2000}>
        <Box
          sx={{
            minHeight: "500px",
          }}
          className="tables-grid"
          pl={"50px"}
          pr={"50px"}
          >
          {/* {errorGuests && <div style={{ alignSelf: "center" }}><span style={{ color: "darkred"}}>{errorMessageGuests}</span></div>} */}

          <SwitchEditMode checked={checked} onChange={switchHandler} />
          {tables?.length === 0 || null ? (
            <div
              className="block"
              style={{ display: tables &&  "none" }}
            >
              <span>Vos tables ici.</span>
            </div>
          ) : (
            <TableList 
                tables={tables}
                table={table}
                searchValue={searchValue}
                edit={edit}
                handleUpdatedTable={handleUpdatedTable}
                input={input}
                setTables={setTables}
                guests={orderedGuests}
                setGuests={setGuests}
                setEdit={setEdit}
                getUpdatedId={getUpdatedId}
                isOpen={isOpen}
                setisOpen={setisOpen}
                setMessage={setMessageTable}
                setMessageType={setMessageTypeTable}
                setTable={setTable}
                checked={checked} 
                setMessageTable={setMessageTable}
                setMessageTypeTable={setMessageTypeTable}
                />
          )}
        </Box>
      </Grow>
    </ContentLayout>
  );
};

export default withRouter(Tables);
