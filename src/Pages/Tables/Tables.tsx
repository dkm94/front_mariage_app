import "./Tables.css";

import React, { useState, useEffect, ChangeEvent } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { Container, Row, Col } from "react-bootstrap";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/material";
import Grow from "@mui/material/Grow";

import { GuestType, TableType } from "../../../types";
import { getGuests } from "../../services/guests/guestRequests";
import { getTables } from "../../services/tables/tableRequests";

import AddTableForm from "./Forms/Add";
import Table from "./Table";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";
import { useFetch } from "../../hooks";

type EditType = {
  id: string;
  name: string;
}

const Tables = (props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [edit, setEdit] = useState<EditType | null>(null);
  const [input, setInput] = useState("");

  const [isOpen, setisOpen] = useState(false);

  // const fetchGuests = async () => { // TODO: problème de performances, trop de re rendus (search bar, update picture...)
  //   try {
  //     setLoading(true);
  //     const guestsResponse = await getGuests();
  //     if(guestsResponse.success && guestsResponse.statusCode === 200) {
  //       setGuests(formatArray(guestsResponse.data)  || []);
  //     } else {
  //       setErrorGuests(true);
  //       if(guestsResponse.message === "Network Error"){
  //         setErrorMessageGuests("Oups, une erreur s'est produite.");
  //       } else {
  //         setErrorMessageGuests(guestsResponse.message);
  //       }
  //     }
  //   } catch (err) {
  //     setErrorMessageGuests(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const { 
    data: tables, 
    setData: setTables, 
    loading: loadingTables, 
    error: errorTables, 
    errorMessage: errorMessageTables } = useFetch<void, TableType[]>(getTables, []);

  const { 
    data: guests, 
    setData: setGuests, 
    error: errorGuests, 
    errorMessage: errorMessageGuests } = useFetch<void, GuestType[]>(getGuests, []);

  const orderedGuests = guests.slice().sort((a, b) => a.name.localeCompare(b.name));

  const handleUpdatedTable = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getUpdatedId = (tableId: string, tableName: string) => {
    setEdit({
      id: tableId,
      name: tableName,
    });
    setInput(tableName);
  };

  const deleteTable = async (e, tableId:string, guest) => {
    e.preventDefault();
    await axios
      .delete(`/api/admin/tables/delete/${tableId}`)
      .then((res) => {
        if (res.data != null) {
          const updateList = [...tables].filter((table) => table._id !== tableId);
          setTables(updateList)
        }
      })
      .catch((err) => {
        //todo: handle errors
        console.log(err);
      });
  };

  return (
    <ContentLayout 
    loading={loadingTables} 
    title={"Comment souhaitez-vous organiser votre plan de table ?"} 
    src={"tables"}
    error={errorTables}
    errorMessage={errorMessageTables}
    >
      <Container style={{ padding: "2rem 50px" }} fluid>
        <Row>
          <Col xs={12} sm={10} md={6} className="table-form">
            <AddTableForm tables={tables} setTables={setTables} />
          </Col>
          <Col xs={12} sm={10} md={6} className="searchbar">
            <SearchBar
              className="search__input"
              type="text"
              placeholder="Rechercher une table"
              name="searchbar"
              value={searchValue}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Container>

      <Grow in={!loadingTables} timeout={2000}>
        <Box
          sx={{
            minHeight: "500px",
          }}
          className="tables-grid"
          pl={"50px"}
          pr={"50px"}
          >
          {errorGuests && <div style={{ alignSelf: "center" }}><span style={{ color: "darkred"}}>{errorMessageGuests}</span></div>}

          {tables?.length === 0 || null ? (
            <div
              className="block"
              style={{ display: tables &&  "none" }}
            >
              <span>Vos tables ici.</span>
            </div>
          ) : (
            <Grid2 container gap={3} justifyContent={"center"}>
              {tables
                .sort((a:TableType, b:TableType) => {
                  return a.name > b.name ? 1 : -1;
                })
                .filter((table) => {
                  return (
                    table.name
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase()) >= 0
                  );
                })
                .map((table) => (
                  <Table
                    tables={tables}
                    table={table}
                    id={table._id}
                    key={table._id}
                    edit={edit}
                    handleUpdatedTable={handleUpdatedTable}
                    input={input}
                    setTables={setTables}
                    guests={orderedGuests}
                    setGuests={setGuests}
                    setEdit={setEdit}
                    getUpdatedId={getUpdatedId}
                    deleteTable={deleteTable}
                    isOpen={isOpen}
                    setisOpen={setisOpen}
                  />
                ))}
            </Grid2>
          )}
        </Box>
      </Grow>
    </ContentLayout>
  );
};

export default withRouter(Tables);
