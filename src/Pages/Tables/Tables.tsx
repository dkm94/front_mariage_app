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

type EditType = {
  id: string;
  name: string;
}

const Tables = (props) => {
  const scrollBtn = useContext(ScrollButtonContext);
  // const loader = useContext(LoaderContext);

  const [searchValue, setSearchValue] = useState<string>("");
  const [tables, setTables] = useState<TableType[] | []>([]);
  const [edit, setEdit] = useState<EditType>({
    id: "",
    name: "",
  });
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const handleUpdatedTable = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const [guests, setGuests] = useState<GuestType[] | []>([]);

  useEffect(() => {
    setLoading(true);

    let guests = axios.get("/api/admin/guests/");
    let tables = axios.get("/api/admin/tables/");

    async function getDatas() {
      let res = await Promise.all([guests, tables]);
      setGuests(res[0].data);
      setTables(res[1].data);

      setLoading(false);
    }
    getDatas();
  }, []);

  const getUpdatedId = (tableId, tableName) => {
    setEdit({
      id: tableId,
      name: tableName,
    });
    setInput(tableName);
  };

  const editTableName = async (e) => {
    e.preventDefault();
    const updatedTableList = [...tables].map((table) => {
      if (table._id === edit.id) {
        table.name = input;
      }
      return table;
    });
    await axios
      .post(`/api/admin/tables/edit/${edit.id}`, { name: input })
      .then((res) => {
        if (res.data != null) {
          setTimeout(() => {
            setTables(updatedTableList);
            setEdit({
              id: "",
              name: "",
            });
          }, 1500);
        }
      })
      .catch((err) => {
        // todo: handle error
        console.log(err);
      });
  };

  const deleteGuest = async (e, guest: GuestType, table: TableType) => {
    e.preventDefault();
    await axios
      .put(`/api/admin/guests/deletetable/${guest._id}`, { tableID: table._id })
      .then((res) => {
        if (res.data != null) {
          const guestsCopy = [...guests]
          const selectedGuestIdx = guestsCopy.findIndex((g) => g._id === guest._id);
          if(selectedGuestIdx !== -1){
            guestsCopy[selectedGuestIdx].tableID = "";
          }
          setGuests([...guestsCopy]);
          setEdit({
            id: "",
            name: "",
          });
          setisOpen(false);
        }
      })
      .catch((err) => {
        // todo: handle error
        console.log(err);
      });
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
                          editTableName={editTableName}
                          handleUpdatedTable={handleUpdatedTable}
                          input={input}
                          setTables={setTables}
                          guests={guests}
                          deleteGuest={deleteGuest}
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
