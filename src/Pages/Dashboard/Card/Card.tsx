import "./Card.css";

import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Col, Container } from "react-bootstrap";

import { CustomButton } from "../../../components/Buttons";

import { GuestType } from "../../../../types";


interface Section {
  _id: string;
  description: string;
}

interface DashboardCardProps {
  title: string;
  path: string;
  content: number | string;
  array?: any[];
  extraProp: string;
  resume: string;
  subArrayOne?: number;
  subArrayTwo?: number;
  subArrayThree?: number;
  subArrayFour?: number;
  subArrayFive?: number;
  firstPerson?: string;
  secondPerson?: string;
  elements?: string;
  firstFamilyGuests?: GuestType[];
  secondFamilyGuests?: GuestType[];
}

const Card = (props: DashboardCardProps) => {
  const { 
    title,
    content,
    array,
    extraProp,
    resume,
    subArrayOne,
    subArrayTwo,
    subArrayThree,
    subArrayFour,
    subArrayFive,
    path,
    firstPerson,
    secondPerson,
    firstFamilyGuests,
    secondFamilyGuests,
  } = props
  const subContent = (
    <div>
      <span>{subArrayOne}</span>
      <span>{subArrayTwo}</span>
      {subArrayThree && <span>{subArrayThree}</span>}
    </div>
  );

  const tasks = (
    <div>
      <span>Completées </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayOne})`}</span>
      <br />
      <span>Restantes </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayTwo})`}</span>
      <br />
    </div>
  );

  const guests = (
    <div>
      <span>{firstPerson} </span>
      <span
        style={{ fontWeight: "bold" }}
      >{`(${firstFamilyGuests?.length})`}</span>
      <br />
      <span>{secondPerson} </span>
      <span
        style={{ fontWeight: "bold" }}
      >{`(${secondFamilyGuests?.length})`}</span>
      <br />
    </div>
  );

  const tables = (array) => {
    const getElement = array?.map((el) => (
      <li key={el?._id}>
        <span>{el?.name} </span>
        <span style={{ fontWeight: "bold" }}>
          ({el?.guestID?.length} pers.)
        </span>
      </li>
    ));
    const getLast = getElement?.slice(-3);
    return getLast;
  };

  const reception: JSX.Element = (
    <div>
      <span>Entrées </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayOne})`}</span>
      <br />
      <span>Plats </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayTwo})`}</span>
      <br />
      <span>Desserts </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayThree})`}</span>
      <br />
      <span>Apéritifs </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayFour})`}</span>
      <br />
      <span>Boissons </span>
      <span style={{ fontWeight: "bold" }}>{`(${subArrayFive})`}</span>
      <br />
    </div>
  );

  const returnDescription = (array: Section[] | undefined): ReactNode => {
    const getElement = array?.map((el) => (
      <li className="overflow" key={el?._id}>
        {el?.description}
      </li>
    ));
    const getLast = getElement?.slice(-3);
    return getLast;
  };

  const resumeTitle = (resume: string): string | null => {
    switch (resume) {
      case "tables":
        return "Récemment ajouté";
      case "expenses":
        return "Récemment ajouté";
      case "repartition":
        return "Répartition";
      case "status":
        return "Statut";
      case "composition":
        return "Composition";
      default:
        return null;
    }
  };

  const returnContent = (extraProp: string): any | null => {
    switch (extraProp) {
      case "name":
        return guests;
      case "tables":
        return tables(array);
      case "multiname":
        return subContent;
      case "tache":
        return tasks;
      case "composition":
        return reception;
      case "description":
        return returnDescription(array);
      default:
        return null;
    }
  };

  return (
    <Col sm={6} md={6} lg={4} className="db-card-container">
      <Container
        className="dashboard-cards db-component-style"
        id="dashboard-cards"
      >
        <h3>{title}</h3>
        {content ? (
          <div className="db-component-count">
            <span>{content}</span>
          </div>
        ) : (
          <div className="db-component-content">
            <span>0</span>
          </div>
        )}
        <div className="dashbord-return-content">
          <span>{resumeTitle(resume)}</span>
          <hr />
          <ul className="dashbord-content">{returnContent(extraProp)}</ul>
        </div>
        <div className="dashbord-view-details">
          <Link to={`/${path}`}>
            <CustomButton text={"Voir détails"} type="button" variant="contained" />
          </Link>
        </div>
      </Container>
    </Col>
  );
};

export default Card;
