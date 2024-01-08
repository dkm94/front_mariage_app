import "./Dashboard.css";

import React, { useEffect, useState, useContext } from "react";
import axios, { AxiosResponse } from "axios";

import { Container, Row } from "react-bootstrap";
import Grow from "@mui/material/Grow";

import ScreenLoader from "../../components/Loader/Screen/ScreenLoader.jsx";
import Card from "./Card/Card.jsx";

import { floatToEuro } from "../../helpers/formatCurrency";
import { GuestType, OperationType, TableType, TaskType, WeddingType } from "../../../types";
import { ScrollButtonContext } from "../../App";


const Dashboard = (props) => {
  const scrollBtn = useContext(ScrollButtonContext);
  //const loader = useContext(LoaderContext)
  const id = props.userInfos.mariageID;

  const [sum, setSum] = useState<string>("")

  const [guests, setGuests] = useState<GuestType[] | []>([]);
  const [tables, setTables] = useState<TableType[] | []>();
  const [operations, setOperations] = useState<OperationType[] | []>([]);
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [maincourses, setMaincourses] = useState([]);
  const [starters, setStarters] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [apetizers, setApetizers] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [wedding, setWeddding] = useState<WeddingType | {}>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let guests: Promise<AxiosResponse> = axios.get<GuestType[]>("/api/admin/guests/");
    let tables: Promise<AxiosResponse>  = axios.get<TableType[]>("/api/admin/tables/");
    let operations: Promise<AxiosResponse>  = axios.get<OperationType[]>("/api/admin/budget/operations/");
    let todos: Promise<AxiosResponse>  = axios.get<TaskType[]>("/api/admin/todolist/");
    let starters: Promise<AxiosResponse>  = axios.get("/api/admin/menu/starters/");
    let maincourses: Promise<AxiosResponse>  = axios.get("/api/admin/menu/maincourses/");
    let desserts: Promise<AxiosResponse>  = axios.get("/api/admin/menu/desserts/");
    let wedding: Promise<AxiosResponse>  = axios.get(`/api/admin/wedding/${id}`);
    let apetizers: Promise<AxiosResponse>  = axios.get("/api/admin/menu/apetizers/");
    let beverages: Promise<AxiosResponse>  = axios.get("/api/admin/menu/beverages/");

    async function getDatas() {
      setLoading(true);
      let res = await Promise.all([
        guests,
        tables,
        operations,
        todos,
        starters,
        maincourses,
        desserts,
        wedding,
        apetizers,
        beverages,
      ]);
      setGuests(res[0].data.data);
      setTables(res[1].data.data);
      setOperations(res[2].data);
      setTasks(res[3].data);
      setStarters(res[4].data);
      setMaincourses(res[5].data);
      setDesserts(res[6].data);
      setWeddding(res[7].data);
      setApetizers(res[8].data);
      setBeverages(res[9].data);

      setLoading(false);
    }
    getDatas();
  }, [id]);

  useEffect(() => {
    if(operations.length > 0) {
    let spending: number = operations.map((operation: OperationType) => operation?.price as number).reduce((a: number, b:number) => a + b) / 100;
    const formattedSum = floatToEuro(spending);
    // const fixedSpending = Number(spending).toFixed(2);
    setSum(formattedSum)
    }
  }, [operations])

  const isCompleted = tasks?.filter((task: TaskType) => task?.isCompleted);
  const notCompleted = tasks?.filter((task: TaskType) => !task?.isCompleted);

  const { firstPerson, secondPerson } = wedding as WeddingType;

  const firstFamilyGuests = guests?.filter((guest: GuestType) => guest?.family === "1");
  const secondFamilyGuests = guests?.filter((guest: GuestType) => guest?.family === "2");

  const meal =
    starters?.length +
    maincourses?.length +
    desserts?.length +
    apetizers?.length +
    beverages?.length;

  return (
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className="dashboard page-component">
          {scrollBtn}
          <div className="page-location">
            <div>
              <span>Dashboard</span>
            </div>
          </div>
          <Grow in={!loading}>
            <div className="titles mb3" style={{ marginBottom: "1rem" }}>
              <h2>Que souhaitez-vous faire aujourd'hui ?</h2>
            </div>
          </Grow>

          <Grow in={!loading} timeout={1000}>
            <div className="dashboard___bgimage"></div>
          </Grow>
          <Grow in={!loading} timeout={2000}>
            <div className="dashboard-cards__style">
              <Container>
                <Row>
                  <Card
                    title={"Invités"}
                    content={guests?.length}
                    array={guests}
                    resume={"repartition"}
                    extraProp={"name"}
                    path={"menu/invites"}
                    firstPerson={firstPerson}
                    secondPerson={secondPerson}
                    firstFamilyGuests={firstFamilyGuests}
                    secondFamilyGuests={secondFamilyGuests}
                  />
                  <Card
                    title={"Tables"}
                    content={tables?.length}
                    array={tables}
                    resume={"tables"}
                    extraProp={"tables"}
                    path={"menu/tables"}
                  />
                  <Card
                    title={"Réception"}
                    content={meal}
                    subArrayOne={starters?.length}
                    subArrayTwo={maincourses?.length}
                    subArrayThree={desserts?.length}
                    subArrayFour={maincourses?.length}
                    subArrayFive={desserts?.length}
                    resume={"composition"}
                    extraProp={"composition"}
                    path={"menu/carte"}
                  />
                  <Card
                    title={"Tâches"}
                    content={tasks?.length}
                    subArrayOne={isCompleted?.length}
                    subArrayTwo={notCompleted?.length}
                    array={tasks}
                    elements={"text"}
                    resume={"status"}
                    extraProp={"tache"}
                    path={"menu/taches"}
                  />
                  <Card
                    title={"Dépenses"}
                    content={sum}
                    array={operations}
                    elements={"description"}
                    resume={"expenses"}
                    extraProp={"description"}
                    path={"menu/budget"}
                  />
                </Row>
              </Container>
            </div>
          </Grow>
        </div>
      )}
    </>
  );
};

export default Dashboard;
