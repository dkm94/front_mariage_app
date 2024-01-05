import "./Tables.css";

import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/material";
import Grow from "@mui/material/Grow";

import { GuestType, TableType } from "../../../types";
import { ScrollButtonContext } from "../../App";

import AddTableForm from "./Forms/Add";
import Table from "./Table";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import ScreenLoader from "../../components/Loader/Screen/ScreenLoader";
import { getGuests } from "../../services/guests/guestRequests";
import { getTables } from "../../services/tables/tableRequests";
import MultipleSelect from "../../components/MultiSelect/MultiSelect";

type EditType = {
  id: string;
  name: string;
}

const Tables = (props) => {
  const scrollBtn = useContext(ScrollButtonContext);
  // const loader = useContext(LoaderContext);
  const [guests, setGuests] = useState<GuestType[] | []>([]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [tables, setTables] = useState<TableType[] | []>([]);
  const [edit, setEdit] = useState<EditType | null>(null);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const [errorGuests, setErrorGuests] = useState<boolean>(false);
  const [errorMessageGuests, setErrorMessageGuests] = useState<string | undefined>(undefined);

  const [errorTables, setErrorTables] = useState<boolean>(false);
  const [errorMessageTables, setErrorMessageTables] = useState<string | undefined>(undefined);


  // TODO: Créer une fonction fetch dynamique fetchData(), qui prend en params un string corresondant à ce que je veux récupérer
  // TODO: Créer un objet qui contient les différents états de mes fetchs, et qui me permet de les appeler dynamiquement (ex: guests: getGuests(), tables: getTables(), etc.)
  const fetchGuests = async () => { // TODO: problème de performances, trop de re rendus (search bar, update picture...)
    try {
      setLoading(true);
      const guestsResponse = await getGuests();
      if(guestsResponse.success && guestsResponse.statusCode === 200) {
        setGuests(guestsResponse.data  || []);
      } else {
        setErrorGuests(true);
        if(guestsResponse.message === "Network Error"){
          setErrorMessageGuests("Oups, une erreur s'est produite.");
        } else {
          setErrorMessageGuests(guestsResponse.message);
        }
      }
    } catch (err) {
      setErrorMessageGuests(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => { // TODO: problème de performances, trop de re rendus (search bar, update picture...)
    try {
      setLoading(true);
      const tablesResponse = await getTables();
      if(tablesResponse.success && tablesResponse.statusCode === 200) {
        setTables(tablesResponse.data  || []);
      } else {
        setErrorTables(true);
        if(tablesResponse.message === "Network Error"){
          setErrorMessageTables("Oups, une erreur s'est produite.");
        } else {
          setErrorMessageTables(tablesResponse.message);
        }
      }
    } catch (err) {
      setErrorMessageTables(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatedTable = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchGuests();
    fetchTables();
}, []);

  const getUpdatedId = (tableId, tableName) => {
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
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className="tables page-component">
          {scrollBtn}
          <div className="page-location">
            <div>
              <Link to={"/"}>Dashboard</Link>
              {">"} Tables
            </div>
          </div>
          <div className="tables-container">
            <Grow in={!loading}>
              <div className="titles mb-3">
                <h2>Comment souhaitez-vous organiser votre plan de table ? </h2>
              </div>
            </Grow>

            <Grow in={!loading} timeout={1000}>
              <div className="tables___bgimage"></div>
            </Grow>

            <Grow in={!loading} timeout={2000}>
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
            </Grow>

            <Grow in={!loading} timeout={2000}>
              <Box
                sx={{
                  minHeight: "500px",
                }}
                className="tables-grid"
                pl={"50px"}
                pr={"50px"}
                >
                {errorTables && <div style={{ alignSelf: "center" }}><span style={{ color: "darkred"}}>{errorMessageTables}</span></div>}
                {errorGuests && <div style={{ alignSelf: "center" }}><span style={{ color: "darkred"}}>{errorMessageGuests}</span></div>}

                {tables?.length === 0 || null ? (
                  <div
                    className="block"
                    style={{ display: tables &&  "none" }}
                  >
                    <span>Vos tables ici.</span>
                  </div>
                ) : (
                  // loading === true ? loader :
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
                          guests={guests}
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
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Tables);
