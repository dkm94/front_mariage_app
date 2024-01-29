import "./Dashboard.css";

import React, { useEffect, useState } from "react";

import { Container, Row } from "react-bootstrap";

import Card from "./Card/Card.jsx";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";

import { getGuests, getTables, getTodos, getWedding, getOperations, getFoods } from "../../services";
import { useFetch } from "../../hooks";
import { GuestType, IDashboardProps, OperationType, TableType, TaskType, WeddingType } from "../../../types";
import { floatToEuro } from "../../helpers/formatCurrency";

type Food = {
  name: string;
  mariageID: string;
  category: string;
}

const Dashboard = (props: IDashboardProps) => { // Ce composant est rendu beaucoup trop de fois
  const id = props?.userInfos?.mariageID;

  const [sum, setSum] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [starters, setStarters] = useState<Food[]>([]);
  const [maincourses, setMaincourses] = useState<Food[]>([]);
  const [desserts, setDesserts] = useState<Food[]>([]);
  const [apetizers, setApetizers] = useState<Food[]>([]);
  const [beverages, setBeverages] = useState<Food[]>([]);

  const { data: wedding, fetchData: fetchWedding } = useFetch<any, WeddingType>(() => getWedding({ id }), undefined);
  const { data: tasks } = useFetch<void, TaskType[]>(getTodos, []);
  const { data: guests } = useFetch<void, GuestType[]>(getGuests, []);
  const { data: tables } = useFetch<void, TableType[]>(getTables, []);
  const { data: operations } = useFetch<void, OperationType[]>(getOperations, []);
  const { data: foods } = useFetch<void, Food[]>(getFoods, []);

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

  const getAllKindsOfFoods = (foods: Food[]) => {
    const starters = foods?.filter((food: Food) => food?.category === "starter");
    const maincourses = foods?.filter((food: Food) => food?.category === "maincourse");
    const desserts = foods?.filter((food: Food) => food?.category === "dessert");
    const apetizers = foods?.filter((food: Food) => food?.category === "apetizer");
    const beverages = foods?.filter((food: Food) => food?.category === "beverage");
    
    if(starters) setStarters(starters);
    if(maincourses) setMaincourses(maincourses);
    if(desserts) setDesserts(desserts);
    if(apetizers) setApetizers(apetizers);
    if(beverages) setBeverages(beverages);
    }

  useEffect(() => {
    getAllKindsOfFoods(foods);
  }, [foods])

  return (
    <ContentLayout loading={loading} title={"Que souhaitez-vous faire aujourd'hui ?"} src={"dashboard"} >
      <Container>
        <Row>
          <Card
            title={"Invités"}
            content={guests?.length}
            array={guests}
            resume={"repartition"}
            extraProp={"name"}
            path={`mariage/${id}/invites`}
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
            path={`mariage/${id}/tables`}
          />
          <Card
            title={"Réception"}
            content={foods?.length}
            subArrayOne={starters?.length}
            subArrayTwo={maincourses?.length}
            subArrayThree={desserts?.length}
            subArrayFour={apetizers?.length}
            subArrayFive={beverages?.length}
            resume={"composition"}
            extraProp={"composition"}
            path={`mariage/${id}/carte`}
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
            path={`mariage/${id}/taches`}
          />
          <Card
            title={"Dépenses"}
            content={sum}
            array={operations}
            elements={"description"}
            resume={"expenses"}
            extraProp={"description"}
            path={`mariage/${id}/budget`}
          />
        </Row>
      </Container>
    </ContentLayout>
  );
};

export default Dashboard;
