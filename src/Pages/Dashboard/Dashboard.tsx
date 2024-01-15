import "./Dashboard.css";
import src from "../../img/orchids.jpg";

import React, { useEffect, useState, useContext } from "react";

import { Container, Row } from "react-bootstrap";
import Grow from "@mui/material/Grow";

import ScreenLoader from "../../components/Loader/Screen/ScreenLoader.jsx";
import Card from "./Card/Card.jsx";

import { getGuests, getTables, getTodos, getWedding, getOperations, getStarters, getMaincourses, getDesserts, getApetizers, getBeverages } from "../../services";
import { useFetch } from "../../hooks";
import { FoodType, GuestType, IDashboardProps, OperationType, TableType, TaskType, WeddingType } from "../../../types";
import { ScrollButtonContext } from "../../App";
import { floatToEuro } from "../../helpers/formatCurrency";
import PageTitle from "../../components/LayoutPage/PageTitle/PageTitle";
import PageBanner from "../../components/LayoutPage/PageBanner/PageBanner";


const Dashboard = (props: IDashboardProps) => { // Ce composant est rendu beaucoup trop de fois
  const scrollBtn = useContext(ScrollButtonContext);
  //const loader = useContext(LoaderContext)
  const id = props?.userInfos?.mariageID;

  const [sum, setSum] = useState<string>("")

  const [loading, setLoading] = useState(false);

  const { data: wedding, fetchData: fetchWedding } = useFetch<any, WeddingType>(() => getWedding({ id }), undefined);
  const { data: tasks } = useFetch<void, TaskType[]>(getTodos, []);
  const { data: guests } = useFetch<void, GuestType[]>(getGuests, []);
  const { data: tables } = useFetch<void, TableType[]>(getTables, []);
  const { data: operations } = useFetch<void, OperationType[]>(getOperations, []);
  const { data: starters } = useFetch<void, FoodType[]>(getStarters, []);
  const { data: maincourses } = useFetch<void, FoodType[]>(getMaincourses, []);
  const { data: desserts } = useFetch<void, FoodType[]>(getDesserts, []);
  const { data: apetizers } = useFetch<void, FoodType[]>(getApetizers, []);
  const { data: beverages } = useFetch<void, FoodType[]>(getBeverages, []);

  useEffect(() => {
    fetchWedding({ id });
  }, [id]);

  useEffect(() => {
    if(operations.length > 0) {
    let spending: number = operations.map((operation: OperationType) => operation?.price as number).reduce((a: number, b:number) => a + b) / 100;
    const formattedSum = floatToEuro(spending);
    setSum(formattedSum)
    }
  }, [operations])

  const isCompleted = tasks?.filter((task: TaskType) => task?.isCompleted);
  const notCompleted = tasks?.filter((task: TaskType) => !task?.isCompleted);

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
          
          <PageTitle loading={loading} title={"Que souhaitez-vous faire aujourd'hui ?"} />

          <PageBanner loading={loading} src={"dashboard"} />

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
                    firstPerson={wedding?.firstPerson}
                    secondPerson={wedding?.secondPerson}
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
