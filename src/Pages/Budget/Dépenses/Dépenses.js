import React from "react";
import flowersIcon from "../../../img/categoryIcons/flowers.png";
import dealIcon from "../../../img/categoryIcons/location.png";
import clothesIcon from "../../../img/categoryIcons/clothes.png";
import otherIcon from "../../../img/categoryIcons/other.png";
import mailIcon from "../../../img/categoryIcons/mail.png";
import musicIcon from "../../../img/categoryIcons/music.png";
import ringsIcon from "../../../img/categoryIcons/rings.png";
import foodIcon from "../../../img/categoryIcons/food.png";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import BlackButton from "../../../components/Buttons/Black/BlackButton.jsx";
import { alpha } from "@material-ui/core";
// import UpdateForm from "./UpdateDépense";
import "./Dépenses.css";

const Expenses = ({ expenses, deleteExpense, updateExpense, searchValue }) => {
  const renderSwitch = (categoryIcons) => {
    switch (categoryIcons) {
      case "Locations":
        return dealIcon;
      case "Habillement/Beauté":
        return clothesIcon;
      case "Décoration/Fleurs":
        return flowersIcon;
      case "Alliances/Bijoux":
        return ringsIcon;
      case "Animation":
        return musicIcon;
      case "Traiteur":
        return foodIcon;
      case "Faire-part":
        return mailIcon;
      default:
        return otherIcon;
    }
  };

  const renderSwitchColors = (categoryIconColors) => {
    switch (categoryIconColors) {
      case "Locations":
        return "#D8C7EB";
      case "Habillement/Beauté":
        return "#A8D4DD";
      case "Décoration/Fleurs":
        return "#FFEC52";
      case "Alliances/Bijoux":
        return "#F8DDA8";
      case "Animation":
        return "#FEDEE2";
      case "Traiteur":
        return "#B6DCB5";
      case "Faire-part":
        return "#C4BEA1";
      default:
        return "#E1E1E1";
    }
  };
  // const [edit, setEdit] = useState({
  //     id: null,
  //     obj: {
  //         title: '',
  //         price: '',
  //         description: ''
  //     }
  // })

  // const submitUpdate = obj => {
  //     updateExpense(obj);
  //     // setEdit({
  //     //     id: null,
  //     //     obj: {
  //     //         title: '',
  //     //         price: '',
  //     //         description: ''
  //     //     }
  //     // });
  // };

  return (
    <ul className="col budget-list">
      {expenses
        .filter((expense) => {
          return (
            expense.description
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) >= 0
          );
        })
        .reverse()
        .map((obj) => {
          let prix = obj.price / 100;
          function financial(prix) {
            return Number(prix).toFixed(2);
          }
          return (
            <li
              key={obj._id}
              style={{
                // border: `3px solid ${renderSwitchColors(obj.category)}`,
                backgroundColor: alpha(renderSwitchColors(obj.category), 0.2),
              }}
              className="mb-3 expenses-container fade-in"
            >
              {/* style={{ backgroundColor: `${renderSwitchColors(obj.category)}` }} */}
              {/* <div className="li___icon center-x">
                <div
                  className="icon___container"
                  style={{ backgroundColor: renderSwitchColors(obj.category) }}
                >
                  <img src={renderSwitch(obj.category)} alt="divers" />
                </div>
              </div> */}

              <div className="expense-li">
                {/* <button
                    onClick={() => {
                      deleteExpense(obj._id);
                    }}
                  >
                    ✖
                  </button> */}
                {/* <div className="expense-li___btn">
                  <IconButton>
                    <CreateIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </div> */}
                {/* {edit.id === obj._id ?
                                (<UpdateForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate} />) :
                                (<>
                                    <ul className="">
                                        <li><strong>{obj.title}</strong></li>
                                        <li>{obj.description}</li>
                                        <li>{financial(prix)}</li>
                                    </ul>
                                    <div className="expense_li___edit-btn">
                                        <button onClick={() => setEdit({
                                            id: obj._id, 
                                            obj: {
                                                title: obj.title,
                                                price: obj.price,
                                                description: obj.description,
                                            }
                                        })}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>
                                    </div>
                                </>)
                            } */}
                <div className="expense__li__style">
                  <div>
                    <span>{obj.description}</span>
                    <span>{obj.category}</span>
                  </div>
                  <div>
                    <span>{financial(prix)} €</span>
                    <span>{obj.date}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  <BlackButton
                    style={{
                      backgroundColor: "white",
                      border: "1px solid lightgrey",
                      color: "black",
                    }}
                    variant="contained"
                    text="Modifier"
                  />
                  <BlackButton variant="contained" text="Supprimer" />
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Expenses;
