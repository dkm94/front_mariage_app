import React, { useEffect, useState, useContext } from "react";
import { ScrollButtonContext } from "../../App";
import "./Dashboard.css";
import axios from "axios";
import Card from "./Card/Card.jsx";
import { Container, Row } from "react-bootstrap";

const Dashboard = (props) => {
  const scrollBtn = useContext(ScrollButtonContext);
  //const loader = useContext(LoaderContext)
  const id = props.userInfos.mariageID;

  const [guests, setGuests] = useState();
  const [tables, setTables] = useState();
  const [operations, setOperations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [maincourses, setMaincourses] = useState([]);
  const [starters, setStarters] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [apetizers, setApetizers] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [wedding, setWeddding] = useState([]);

  useEffect(() => {
    let guests = axios.get("/api/admin/guests/");
    let tables = axios.get("/api/admin/tables/");
    let operations = axios.get("/api/admin/budget/operations/");
    let todos = axios.get("/api/admin/todolist/");
    let starters = axios.get("/api/admin/menu/starters/");
    let maincourses = axios.get("/api/admin/menu/maincourses/");
    let desserts = axios.get("/api/admin/menu/desserts/");
    let wedding = axios.get(`/api/admin/wedding/${id}`);
    let apetizers = axios.get("/api/admin/menu/apetizers/");
    let beverages = axios.get("/api/admin/menu/beverages/");

    async function getDatas() {
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
      setGuests(res[0].data);
      setTables(res[1].data);
      setOperations(res[2].data);
      setTasks(res[3].data);
      setStarters(res[4].data);
      setMaincourses(res[5].data);
      setDesserts(res[6].data);
      setWeddding(res[7].data);
      setApetizers(res[8].data);
      setBeverages(res[9].data);
    }
    getDatas();
  }, [id]);

  let sum = operations.reduce((a, b) => a + b.price, 0) / 100;
  function total(sum) {
    return Number(sum).toFixed(2);
  }

  const sumLength = sum.toString().length;

  const isCompleted = tasks?.filter((task) => task?.isCompleted);
  const notCompleted = tasks?.filter((task) => !task?.isCompleted);

  const { firstPerson, secondPerson } = wedding;

  const firstFamilyGuests = guests?.filter((guest) => guest?.family === "1");
  const secondFamilyGuests = guests?.filter((guest) => guest?.family === "2");

  const meal =
    starters?.length +
    maincourses?.length +
    desserts?.length +
    apetizers?.length +
    beverages?.length;

  return (
    <div className="dashboard page-component">
      {scrollBtn}
      <div className="page-location">
        <div>
          <span>Dashboard</span>
        </div>
      </div>
      <div className="titles mb3" style={{ marginBottom: "1rem" }}>
        <h2>Que souhaitez-vous faire aujourd'hui ?</h2>
      </div>
      <div className="dashboard___bgimage">
        <div className="component-title">
          <h1>Tableau de bord</h1>
        </div>
      </div>
      <div className="dashboard-cards__style">
        <Container>
          <Row className="mid-device-width">
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
              title={"Dépenses (en €)"}
              content={` ${total(sum)}`}
              sumLength={sumLength}
              array={operations}
              elements={"description"}
              resume={"expenses"}
              extraProp={"description"}
              path={"menu/budget"}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
