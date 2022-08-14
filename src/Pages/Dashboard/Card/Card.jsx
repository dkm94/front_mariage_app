import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
// import { styled } from '@mui/styles';
import "./Card.css";
// import { ButtonGroup } from 'react-bootstrap';
// import { array } from 'yup/lib/locale';

// const ColorButton = styled(Button)({
//   backgroundColor: "#efebe9",
//   borderRadius: "10px",
//   '&:hover': {
//     backgroundColor: "#d7ccc8",
//   },
// });

const Card = ({ 
  title, 
  content, 
  array, 
  extraProp,
  resume,  
  subArrayOne, 
  subArrayTwo, 
  subArrayThree,
  path,
  firstPerson,
  secondPerson,
  firstFamilyGuests,
  secondFamilyGuests
}) => {

  const subContent = <div>
    <span>{subArrayOne}</span>
    <span>{subArrayTwo}</span>
    {subArrayThree && <span>{subArrayThree}</span>}
  </div>

  const tasks = <div>
    <span>Completées </span><span style={{ fontWeight: "bold"}}>{`(${subArrayOne})`}</span><br/>
    <span>Restantes </span><span style={{ fontWeight: "bold"}}>{`(${subArrayTwo})`}</span><br/>
  </div>

  // const returnName = (array) => {
  //   const getElement = array?.map(el => <li key={el?._id}>{el?.name}</li>);
  //   const getLast = getElement?.slice(-3);
  //   return getLast;
  // }

  const guests = <div>
    <span>{firstPerson} </span><span style={{ fontWeight: "bold"}}>{`(${firstFamilyGuests?.length})`}</span><br/>
    <span>{secondPerson} </span><span style={{ fontWeight: "bold"}}>{`(${secondFamilyGuests?.length})`}</span><br/>
  </div>

  const tables = (array) => {
    const getElement = array?.map(el => <li key={el?._id}><span>{el?.name} </span><span style={{ fontWeight: "bold"}}>({el?.guestID?.length} pers.)</span></li>);
    const getLast = getElement?.slice(-3);
    return getLast;
  }

  const reception = <div>
    <span>Entrées </span><span style={{ fontWeight: "bold"}}>{`(${subArrayOne})`}</span><br/>
    <span>Plats </span><span style={{ fontWeight: "bold"}}>{`(${subArrayTwo})`}</span><br/>
    <span>Desserts </span><span style={{ fontWeight: "bold"}}>{`(${subArrayThree})`}</span><br/>
  </div>
  

  const returnDescription = (array) => {
    const getElement = array?.map(el => <li key={el?._id}>{el?.description}</li>);
    const getLast = getElement?.slice(-3);
    return getLast;
  }

  const resumeTitle = (resume) => {
    switch (resume) {
      case "tables":
        return "Récemment ajouté";
      case "repartition":
        return "Répartition";
      case "status":
        return "Statut";
        case "composition":
          return "Composition";
      default:
        return null
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
        return null
    }
  };

  return (
    <div className='home-cards db-component-style' id="home-cards">
      <h3>{title}</h3>
      {content && <div className='db-component-content'>{content}</div>}
      <div className='dashbord-return-content' >
        <span>{resumeTitle(resume)}</span>
        <ul className='dashbord-content'>{returnContent(extraProp)}</ul>
      </div>
      <div className='dashbord-view-details' >
        <Button style={{ backgroundColor: "#efebe9" }} component={Link} to={path} >Voir détails</Button>
      </div>
    </div>
  )
}

export default Card;