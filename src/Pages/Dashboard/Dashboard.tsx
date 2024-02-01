import "./Dashboard.css";

import React, { useEffect, useState } from "react";

import { Container, Row } from "react-bootstrap";

import Card from "./Card/Card";
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
  const id: string | undefined = props?.userInfos?.mariageID;

  const [sum, setSum] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [starters, setStarters] = useState<Food[]>([]);
  const [maincourses, setMaincourses] = useState<Food[]>([]);
  const [desserts, setDesserts] = useState<Food[]>([]);
  const [apetizers, setApetizers] = useState<Food[]>([]);
  const [beverages, setBeverages] = useState<Food[]>([]);

  const { data: wedding, fetchData: fetchWedding } = useFetch<any, WeddingType>(() => getWedding({ id }), undefined);
  const { data: tasks, message: todosMessage, messageType: todosMessageType } = useFetch<void, TaskType[]>(getTodos, []);
  const { data: guests, message: guestsMessage, messageType: guestsMessageType } = useFetch<void, GuestType[]>(getGuests, []);
  const { data: tables, message: tablesMessage, messageType: tablesMessageType } = useFetch<void, TableType[]>(getTables, []);
  const { data: operations, message: operationsMessage, messageType: operationsMessageType } = useFetch<void, OperationType[]>(getOperations, []);
  const { data: foods, message: foodsMessage, messageType: foodsMessageType } = useFetch<void, Food[]>(getFoods, []);

  useEffect(() => {
    fetchWedding({ id });
  }, [id]);

  useEffect(() => {
    if(operations.length > 0) {
    let spending: number = operations.map((operation: OperationType) => operation?.price as number).reduce((a: number, b:number) => a + b) / 100;
    const formattedSum:string = floatToEuro(spending);
    setSum(formattedSum)
    }
  }, [operations])

  const isCompleted:TaskType[] = tasks?.filter((task: TaskType) => task?.isCompleted);
  const notCompleted:TaskType[] = tasks?.filter((task: TaskType) => !task?.isCompleted);

  const firstFamilyGuests:GuestType[] = guests?.filter((guest: GuestType) => guest?.family === "1");
  const secondFamilyGuests:GuestType[]  = guests?.filter((guest: GuestType) => guest?.family === "2");

  const getAllKindsOfFoods = (foods: Food[]): void => {
    const starters: Food[] = foods?.filter((food) => food?.category === "starter");
    const maincourses: Food[] = foods?.filter((food) => food?.category === "maincourse");
    const desserts: Food[] = foods?.filter((food) => food?.category === "dessert");
    const apetizers: Food[] = foods?.filter((food) => food?.category === "apetizer");
    const beverages: Food[] = foods?.filter((food) => food?.category === "beverage");
    
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
    <ContentLayout 
    loading={loading} 
    title={"Que souhaitez-vous faire aujourd'hui ?"} 
    src={"dashboard"} 
    message={todosMessage || guestsMessage || tablesMessage || operationsMessage || foodsMessage} 
    messageType={todosMessageType || guestsMessageType || tablesMessageType || operationsMessageType || foodsMessageType} 
    id={""} >
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
