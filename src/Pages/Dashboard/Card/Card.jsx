import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Card.css";
import { Col, Container } from "react-bootstrap";

const Card = ({
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
  sumLength,
}) => {
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

  // const returnName = (array) => {
  //   const getElement = array?.map(el => <li key={el?._id}>{el?.name}</li>);
  //   const getLast = getElement?.slice(-3);
  //   return getLast;
  // }

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
        {/* <span style={{ fontWeight: "bold" }}>
          ({el?.guestID?.length} pers.)
        </span> */}
      </li>
    ));
    const getLast = getElement?.slice(-3);
    return getLast;
  };

  const reception = (
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

  const returnDescription = (array) => {
    const getElement = array?.map((el) => (
      <li className="overflow" key={el?._id}>
        {el?.description}
      </li>
    ));
    const getLast = getElement?.slice(-3);
    return getLast;
  };

  const resumeTitle = (resume) => {
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

  const returnContent = (extraProp) => {
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
    <Col sm={6} md={6} lg={4} style={{ marginTop: "2rem" }}>
      <Container
        className="dashboard-cards db-component-style"
        id="dashboard-cards"
      >
        <h3>{title}</h3>
        {content ? (
          <div className="db-component-content">
            <span style={{ fontSize: "3rem" }}>{content}</span>
          </div>
        ) : (
          <div className="db-component-content">
            <span style={{ fontSize: "3rem" }}>0</span>
          </div>
        )}
        <div className="dashbord-return-content">
          <span>{resumeTitle(resume)}</span>
          <hr />
          <ul className="dashbord-content">{returnContent(extraProp)}</ul>
        </div>
        <div className="dashbord-view-details">
          <Button type="button" variant="contained" component={Link} to={path}>
            Voir détails
          </Button>
        </div>
      </Container>
    </Col>
  );
};

export default Card;
