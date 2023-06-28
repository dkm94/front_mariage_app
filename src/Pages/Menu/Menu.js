import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import apetizerImg from "../../img/menus/apetizers.jpg";
import beverageImg from "../../img/menus/beverages.jpg";
import { ScrollButtonContext } from "../../../src/App";
import addIcon from "../../img/plus.png";
import axios from "axios";
import "./Menu.css";
import AddStarterForm from "./Forms/Add/AddStarter";
import AddMaincourseForm from "./Forms/Add/AddMaincourse";
import AddDessertForm from "./Forms/Add/AddDessert";
import AddApetizerForm from "./Forms/Add/AddApetizer";
import AddBeverageForm from "./Forms/Add/AddBeverage";
import UpdateStarter from "./Forms/Update/Starter";
import UpdateMaincourse from "./Forms/Update/Maincourse";
import UpdateDessert from "./Forms/Update/Dessert";
import UpdateApetizer from "./Forms/Update/Apetizer";
import UpdateBeverage from "./Forms/Update/Beverage";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import styled from "@emotion/styled";
import ScreenLoader from "../../components/Loader/Screen/ScreenLoader";
import Grow from "@mui/material/Grow";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

const Menus = () => {
  const scrollBtn = useContext(ScrollButtonContext);

  const [starters, setStarters] = useState([]);
  const [starter, setStarter] = useState({});

  const [maincourses, setMaincourses] = useState([]);
  const [maincourse, setMaincourse] = useState({});

  const [desserts, setDesserts] = useState([]);
  const [dessert, setDessert] = useState({});

  const [apetizers, setApetizers] = useState([]);
  const [apetizer, setApetizer] = useState({});

  const [beverages, setBeverages] = useState([]);
  const [beverage, setBeverage] = useState({});

  const [edit, setEdit] = useState({
    id: null,
    name: "",
  });

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const getUpdatedId = (objId, objName) => {
    setEdit({
      id: objId,
      name: objName,
    });
    setInput(objName);
  };

  useEffect(() => {
    setLoading(true);

    let starterData = axios.get("/api/admin/menu/starters/");
    let maincourseData = axios.get("/api/admin/menu/maincourses/");
    let dessertData = axios.get("/api/admin/menu/desserts/");
    let apetizerData = axios.get("/api/admin/menu/apetizers/");
    let beverageData = axios.get("/api/admin/menu/beverages/");
    async function getDatas() {
      let res = await Promise.all([
        starterData,
        maincourseData,
        dessertData,
        apetizerData,
        beverageData,
      ]);
      setStarters(res[0].data);
      setMaincourses(res[1].data);
      setDesserts(res[2].data);
      setApetizers(res[3].data);
      setBeverages(res[4].data);

      setLoading(false);
    }
    getDatas();
  }, [starter, maincourse, dessert, apetizer, beverage]);

  const addStarter = (newStarter) => {
    setStarter(newStarter);
    setStarters([...starters, newStarter]);
  };

  const addMaincourse = (newMaincourse) => {
    setMaincourse(newMaincourse);
    setMaincourses([...maincourses, newMaincourse]);
  };

  const addDessert = (newDessert) => {
    setDessert(newDessert);
    setDesserts([...desserts, newDessert]);
  };

  const addApetizer = (newApetizer) => {
    setApetizer(newApetizer);
    setApetizers([...apetizers, newApetizer]);
  };

  const addBeverage = (newBeverage) => {
    setBeverage(newBeverage);
    setBeverages([...beverages, newBeverage]);
  };

  const editStarter = (updatedStarter) => {
    const updatedStartersList = [...starters].map((starter) => {
      if (starter._id === updatedStarter.id) {
        starter.name = updatedStarter.name;
      }
      return starter;
    });
    setStarter(updatedStarter);
    setStarters(updatedStartersList);
  };

  const editMaincourse = (updatedMaincourse) => {
    const updatedMaincourseList = [...maincourses].map((maincourse) => {
      if (maincourse._id === edit.id) {
        maincourse.name = input;
      }
      return maincourse;
    });
    setMaincourse(updatedMaincourse);
    setMaincourses(updatedMaincourseList);
  };

  const editDessert = (updatedDessert) => {
    const updatedDessertList = [...desserts].map((dessert) => {
      if (dessert._id === edit.id) {
        dessert.name = input;
      }
      return dessert;
    });
    setMaincourse(updatedDessert);
    setMaincourses(updatedDessertList);
  };

  const editApetizer = (updatedApetizer) => {
    const updatedApetizerList = [...apetizers].map((apetizer) => {
      if (apetizer._id === edit.id) {
        apetizer.name = input;
      }
      return dessert;
    });
    setMaincourse(updatedApetizer);
    setMaincourses(updatedApetizerList);
  };

  const editBeverage = (updatedBeverage) => {
    const updatedBeverageList = [...beverages].map((beverage) => {
      if (beverage._id === edit.id) {
        beverage.name = input;
      }
      return dessert;
    });
    setBeverage(updatedBeverage);
    setBeverages(updatedBeverageList);
  };

  const deleteStarter = async (id) => {
    await axios.delete(`/api/admin/menu/starters/delete/${id}`).then((res) => {
      if (res.data != null) {
        setStarters(starters.filter((starter) => starter._id !== id));
      }
    });
  };

  const deleteMaincourse = async (id) => {
    await axios
      .delete(`/api/admin/menu/maincourses/delete/${id}`)
      .then((res) => {
        if (res.data != null) {
          setMaincourses(
            maincourses.filter((maincourse) => maincourse._id !== id)
          );
        }
      });
  };

  const deleteDessert = async (id) => {
    await axios.delete(`/api/admin/menu/desserts/delete/${id}`).then((res) => {
      if (res.data != null) {
        setDesserts(desserts.filter((dessert) => dessert._id !== id));
      }
    });
  };

  const deleteApetizer = async (id) => {
    await axios.delete(`/api/admin/menu/apetizers/delete/${id}`).then((res) => {
      if (res.data != null) {
        setApetizers(apetizers.filter((apetizer) => apetizer._id !== id));
      }
    });
  };

  const deleteBeverage = async (id) => {
    await axios.delete(`/api/admin/menu/beverages/delete/${id}`).then((res) => {
      if (res.data != null) {
        setBeverages(beverages.filter((beverage) => beverage._id !== id));
      }
    });
  };

  return (
    <>
      {loading ? (
        <ScreenLoader />
      ) : (
        <div className="menu-container page-component">
          {scrollBtn}
          <div className="menu">
            <div className="page-location">
              <div>
                <Link to={"/"}>Dashboard</Link>
                {">"} Carte
              </div>
            </div>
            <Grow in={!loading}>
              <div className="titles mb-3">
                <h2>Avez-vous prévu une réception ?</h2>
              </div>
            </Grow>

            <Grow in={!loading} timeout={1000}>
              <div className="menu___bgimage"></div>
            </Grow>

            <Grow in={!loading} timeout={2000}>
              <div className="menu__list__container">
                <div className="menu___list">
                  <div className="starter forms">
                    <div className="starter___div_img">
                      <img src={starterImg} alt="starter" />
                    </div>
                    <div className="starter___div_form fade-in fade-in">
                      {starters.length === 0 || starters.length === 1 ? (
                        <h3 className="menu__title">Entrée</h3>
                      ) : (
                        <h3 className="menu__title">Entrées</h3>
                      )}
                      <div className="menu___forms">
                        <AddStarterForm
                          addStarter={addStarter}
                          icon={addIcon}
                        />
                      </div>
                      {starters.length === 0 ? (
                        <div className="empty-div">
                          <span>Vos entrées ici</span>
                        </div>
                      ) : (
                        <Grid2 xs={12} component={"ul"} container>
                          {starters.map((starter) => (
                            <Grid2
                              xs={12}
                              key={starter._id}
                              component={"li"}
                              display={"flex"}
                              flexDirection={"row"}
                              minHeight="36px"
                              alignItems={"center"}
                            >
                              {edit.id === starter._id ? (
                                <UpdateStarter
                                  edit={edit}
                                  setEdit={setEdit}
                                  editStarter={editStarter}
                                />
                              ) : (
                                <Grid2
                                  lg={8}
                                  md={8}
                                  xs={8}
                                  component={"span"}
                                  width={"100%"}
                                >
                                  {starter.name}
                                </Grid2>
                              )}

                              <Grid2
                                lg={4}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={"7px"}
                              >
                                {!edit.id && (
                                  <>
                                    <IconWrapper
                                      onClick={() =>
                                        getUpdatedId(starter._id, starter.name)
                                      }
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid lightgray",
                                        borderRadius: "5px",
                                        color: "#262626",
                                      }}
                                    >
                                      <CreateIcon fontSize="small" />
                                    </IconWrapper>
                                    <IconWrapper
                                      type="submit"
                                      onClick={() => deleteStarter(starter._id)}
                                      style={{
                                        backgroundColor: "#bf1e1e",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconWrapper>
                                  </>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                        </Grid2>
                      )}
                    </div>
                  </div>
                  <div className="maincourse forms" id="forms_reverse">
                    <div className="maincourse___div_form fade-in fade-in">
                      {maincourses.length === 0 || maincourses.length === 1 ? (
                        <h3 className="menu__title">Plat</h3>
                      ) : (
                        <h3 className="menu__title">Plats</h3>
                      )}
                      <div className="menu___forms">
                        <AddMaincourseForm
                          addMaincourse={addMaincourse}
                          icon={addIcon}
                        />
                      </div>
                      {maincourses.length === 0 ? (
                        <div className="empty-div">
                          <span>Vos plats ici</span>
                        </div>
                      ) : (
                        <Grid2 xs={12} component={"ul"} container>
                          {maincourses.map((maincourse) => (
                            <Grid2
                              xs={12}
                              key={maincourse._id}
                              component={"li"}
                              display={"flex"}
                              flexDirection={"row"}
                              minHeight="36px"
                              alignItems={"center"}
                            >
                              {edit.id === maincourse._id ? (
                                <UpdateMaincourse
                                  edit={edit}
                                  setEdit={setEdit}
                                  editMaincourse={editMaincourse}
                                />
                              ) : (
                                <Grid2
                                  lg={8}
                                  md={8}
                                  xs={8}
                                  component={"span"}
                                  width={"100%"}
                                >
                                  {maincourse.name}
                                </Grid2>
                              )}

                              <Grid2
                                lg={4}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={"7px"}
                              >
                                {!edit.id && (
                                  <>
                                    <IconWrapper
                                      onClick={() =>
                                        getUpdatedId(
                                          maincourse._id,
                                          maincourse.name
                                        )
                                      }
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid lightgray",
                                        borderRadius: "5px",
                                        color: "#262626",
                                      }}
                                    >
                                      <CreateIcon fontSize="small" />
                                    </IconWrapper>
                                    <IconWrapper
                                      type="submit"
                                      onClick={() =>
                                        deleteMaincourse(maincourse._id)
                                      }
                                      style={{
                                        backgroundColor: "#bf1e1e",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconWrapper>
                                  </>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                        </Grid2>
                      )}
                    </div>
                    <div className="maincourse___div_img">
                      <img src={maincourseImg} alt="main couse" />
                    </div>
                  </div>
                  <div className="starter forms">
                    <div className="dessert___div_img">
                      <img src={dessertImg} alt="dessert" />
                    </div>
                    <div className="starter___div_form fade-in fade-in">
                      {desserts.length === 0 || desserts.length === 1 ? (
                        <h3 className="menu__title">Dessert</h3>
                      ) : (
                        <h3 className="menu__title">Desserts</h3>
                      )}
                      <div className="menu___forms">
                        <AddDessertForm
                          addDessert={addDessert}
                          icon={addIcon}
                        />
                      </div>
                      {desserts.length === 0 ? (
                        <div className="empty-div">
                          <span>Vos desserts ici</span>
                        </div>
                      ) : (
                        <Grid2 xs={12} component={"ul"} container>
                          {desserts.map((dessert) => (
                            <Grid2
                              xs={12}
                              key={dessert._id}
                              component={"li"}
                              display={"flex"}
                              flexDirection={"row"}
                              minHeight="36px"
                              alignItems={"center"}
                            >
                              {edit.id === dessert._id ? (
                                <UpdateDessert
                                  edit={edit}
                                  setEdit={setEdit}
                                  editDessert={editDessert}
                                />
                              ) : (
                                <Grid2
                                  lg={8}
                                  md={8}
                                  xs={8}
                                  component={"span"}
                                  width={"100%"}
                                >
                                  {dessert.name}
                                </Grid2>
                              )}
                              <Grid2
                                lg={4}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={"7px"}
                              >
                                {!edit.id && (
                                  <>
                                    <IconWrapper
                                      onClick={() =>
                                        getUpdatedId(dessert._id, dessert.name)
                                      }
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid lightgray",
                                        borderRadius: "5px",
                                        color: "#262626",
                                      }}
                                    >
                                      <CreateIcon fontSize="small" />
                                    </IconWrapper>
                                    <IconWrapper
                                      type="submit"
                                      onClick={() => deleteDessert(dessert._id)}
                                      style={{
                                        backgroundColor: "#bf1e1e",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconWrapper>
                                  </>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                        </Grid2>
                      )}
                    </div>
                  </div>
                  <div className="maincourse forms" id="forms_reverse">
                    <div className="dessert___div_form fade-in">
                      {apetizers.length === 0 || apetizers.length === 1 ? (
                        <h3 className="menu__title">Apéritif</h3>
                      ) : (
                        <h3 className="menu__title">Apéritifs</h3>
                      )}
                      <div className="menu___forms">
                        <AddApetizerForm
                          addApetizer={addApetizer}
                          icon={addIcon}
                        />
                      </div>
                      {apetizers.length === 0 ? (
                        <div className="empty-div">
                          <span>Vos apéritifs ici</span>
                        </div>
                      ) : (
                        <Grid2 xs={12} component={"ul"} container>
                          {apetizers.map((apetizer) => (
                            <Grid2
                              xs={12}
                              key={apetizer._id}
                              component={"li"}
                              display={"flex"}
                              flexDirection={"row"}
                              minHeight="36px"
                              alignItems={"center"}
                            >
                              {edit.id === apetizer._id ? (
                                <UpdateApetizer
                                  edit={edit}
                                  setEdit={setEdit}
                                  editApetizer={editApetizer}
                                />
                              ) : (
                                <Grid2
                                  lg={8}
                                  md={8}
                                  xs={8}
                                  component={"span"}
                                  width={"100%"}
                                >
                                  {apetizer.name}
                                </Grid2>
                              )}
                              <Grid2
                                lg={4}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={"7px"}
                              >
                                {!edit.id && (
                                  <>
                                    <IconWrapper
                                      onClick={() =>
                                        getUpdatedId(
                                          apetizer._id,
                                          apetizer.name
                                        )
                                      }
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid lightgray",
                                        borderRadius: "5px",
                                        color: "#262626",
                                      }}
                                    >
                                      <CreateIcon fontSize="small" />
                                    </IconWrapper>
                                    <IconWrapper
                                      type="submit"
                                      onClick={() => {
                                        deleteApetizer(apetizer._id);
                                      }}
                                      style={{
                                        backgroundColor: "#bf1e1e",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconWrapper>
                                  </>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                        </Grid2>
                      )}
                    </div>
                    <div className="dessert___div_img">
                      <img src={apetizerImg} alt="apéritif" />
                    </div>
                  </div>
                  <div className="dessert forms">
                    <div className="dessert___div_img">
                      <img src={beverageImg} alt="boisson" />
                    </div>
                    <div className="dessert___div_form fade-in">
                      {beverages.length === 0 || beverages.length === 1 ? (
                        <h3 className="menu__title">Boisson</h3>
                      ) : (
                        <h3 className="menu__title">Boissons</h3>
                      )}
                      <div className="menu___forms">
                        <AddBeverageForm
                          addBeverage={addBeverage}
                          icon={addIcon}
                        />
                      </div>
                      {beverages.length === 0 ? (
                        <div className="empty-div">
                          <span>Vos boissons ici</span>
                        </div>
                      ) : (
                        <Grid2 xs={12} component={"ul"} container>
                          {beverages.map((beverage) => (
                            <Grid2
                              xs={12}
                              key={beverage._id}
                              component={"li"}
                              display={"flex"}
                              flexDirection={"row"}
                              minHeight="36px"
                              alignItems={"center"}
                            >
                              {edit.id === beverage._id ? (
                                <UpdateBeverage
                                  edit={edit}
                                  setEdit={setEdit}
                                  editBeverage={editBeverage}
                                />
                              ) : (
                                <Grid2
                                  lg={8}
                                  md={8}
                                  xs={8}
                                  component={"span"}
                                  width={"100%"}
                                >
                                  {beverage.name}
                                </Grid2>
                              )}
                              <Grid2
                                lg={4}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={"7px"}
                              >
                                {!edit.id && (
                                  <>
                                    <IconWrapper
                                      onClick={() =>
                                        getUpdatedId(
                                          beverage._id,
                                          beverage.name
                                        )
                                      }
                                      style={{
                                        backgroundColor: "#fff",
                                        border: "1px solid lightgray",
                                        borderRadius: "5px",
                                        color: "#262626",
                                      }}
                                    >
                                      <CreateIcon fontSize="small" />
                                    </IconWrapper>
                                    <IconWrapper
                                      type="submit"
                                      onClick={() =>
                                        deleteBeverage(beverage._id)
                                      }
                                      style={{
                                        backgroundColor: "#bf1e1e",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconWrapper>
                                  </>
                                )}
                              </Grid2>
                            </Grid2>
                          ))}
                        </Grid2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Grow>
          </div>
        </div>
      )}
    </>
  );
};

export default Menus;
