import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
// import { styled } from '@mui/styles';
// import "./Card.css";
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
  path
}) => {

  const subContent = <div>
    <span>{subArrayOne}</span>
    <span>{subArrayTwo}</span>
    {subArrayThree && <span>{subArrayThree}</span>}
  </div>

  const returnName = (array) => {
    const getElement = array?.map(el => <li key={el?._id}>{el?.name}</li>);
    const getLast = getElement?.slice(-3);
    return getLast;
  }

  const returnDescription = (array) => {
    const getElement = array?.map(el => <li key={el?._id}>{el?.description}</li>);
    const getLast = getElement?.slice(-3);
    return getLast;
  }

  const resumeTitle = (resume) => {
    switch (resume) {
      case "lastAdded":
        return "Récemment ajouté";
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
        return returnName(array);
      case "multiname":
        return subContent;
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
      <div>
        <span>{resumeTitle(resume)}</span>
        <ul>{returnContent(extraProp)}</ul>
      </div>
      <div>
        <Button style={{ backgroundColor: "#efebe9" }} component={Link} to={path} >Voir détails</Button>
      </div>
    </div>
  )
}

export default Card;