import "./Menu.css";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Grow from "@mui/material/Grow";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import styled from "@emotion/styled";

import { ScrollButtonContext } from "../../App";

import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import apetizerImg from "../../img/menus/apetizers.jpg";
import beverageImg from "../../img/menus/beverages.jpg";

import { AddStarterForm, AddMaincourseForm, AddDessertForm, AddApetizerForm, AddBeverageForm } from "./Forms/Add";
import { UpdateStarter, UpdateMaincourse, UpdateDessert, UpdateApetizer, UpdateBeverage } from "./Forms/Update";
import ScreenLoader from "../../components/Loader/Screen/ScreenLoader";
import { FoodType } from "../../../types";

const IconWrapper = styled(IconButton)({
  "&:hover": {
    background: "none",
  },
});

type EditType = {
  id: string;
  name: string;
};

const Menus = () => {
  const scrollBtn = useContext(ScrollButtonContext);

  const [starters, setStarters] = useState<FoodType[] | []>([]);
  const [starter, setStarter] = useState<FoodType | {}>({});

  const [maincourses, setMaincourses] = useState<FoodType[] | []>([]);
  const [maincourse, setMaincourse] = useState<FoodType | {}>({});

  const [desserts, setDesserts] = useState<FoodType[] | []>([]);
  const [dessert, setDessert] = useState<FoodType | {}>({});

  const [apetizers, setApetizers] = useState<FoodType[] | []>([]);
  const [apetizer, setApetizer] = useState<FoodType | {}>({});

  const [beverages, setBeverages] = useState<FoodType[] | []>([]);
  const [beverage, setBeverage] = useState<FoodType | {}>({});

  const [edit, setEdit] = useState<EditType>({
    id: "",
    name: "",
  });

  const [input, setInput] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const getUpdatedId = (objId, objName) => {
    setEdit({
      id: objId,
      name: objName,
    });
    setInput(objName);
  };

  useEffect(() => {
    setLoading(true);

    let starterData: Promise<AxiosResponse> = axios.get<FoodType[]>("/api/admin/menu/starters/");
    let maincourseData: Promise<AxiosResponse> = axios.get<FoodType[]>("/api/admin/menu/maincourses/");
    let dessertData: Promise<AxiosResponse> = axios.get<FoodType[]>("/api/admin/menu/desserts/");
    let apetizerData: Promise<AxiosResponse> = axios.get<FoodType[]>("/api/admin/menu/apetizers/");
    let beverageData: Promise<AxiosResponse> = axios.get<FoodType[]>("/api/admin/menu/beverages/");
    
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
  }, []);

  //todo: error in update handling

  const deleteStarter = async (id) => {
    await axios.delete(`/api/admin/menu/starters/delete/${id}`).then((res) => {
      if (res.data != null) {
        setStarters(starters.filter((starter: FoodType) => starter._id !== id));
      }
    });
  };

  const deleteMaincourse = async (id) => {
    await axios
      .delete(`/api/admin/menu/maincourses/delete/${id}`)
      .then((res) => {
        if (res.data != null) {
          setMaincourses(
            maincourses.filter((maincourse: FoodType) => maincourse._id !== id)
          );
        }
      });
  };

  const deleteDessert = async (id) => {
    await axios.delete(`/api/admin/menu/desserts/delete/${id}`).then((res) => {
      if (res.data != null) {
        setDesserts(desserts.filter((dessert: FoodType) => dessert._id !== id));
      }
    });
  };

  const deleteApetizer = async (id) => {
    await axios.delete(`/api/admin/menu/apetizers/delete/${id}`).then((res) => {
      if (res.data != null) {
        setApetizers(apetizers.filter((apetizer: FoodType) => apetizer._id !== id));
      }
    });
  };

  const deleteBeverage = async (id) => {
    await axios.delete(`/api/admin/menu/beverages/delete/${id}`).then((res) => {
      if (res.data != null) {
        setBeverages(beverages.filter((beverage: FoodType) => beverage._id !== id));
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
                          starters={starters}
                          setStarters={setStarters}
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
                                  setStarters={setStarters}
                                  starters={starters}
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
                                        backgroundColor: "darkred",
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
                          maincourses={maincourses}
                          setMaincourses={setMaincourses}
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
                                  maincourses={maincourses}
                                  setMaincourses={setMaincourses}
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
                                        backgroundColor: "darkred",
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
                          desserts={desserts}
                          setDesserts={setDesserts}
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
                                  desserts={desserts}
                                  setDesserts={setDesserts}
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
                                        backgroundColor: "darkred",
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
                          apetizers={apetizers}
                          setApetizers={setApetizers}
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
                                  apetizers={apetizers}
                                  setApetizers={setApetizers}
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
                                        backgroundColor: "darkred",
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
                        <h3 className="menu__title" style={{ textAlign: "end"}}>Boisson</h3>
                      ) : (
                        <h3 className="menu__title" style={{ textAlign: "end"}}>Boissons</h3>
                      )}
                      <div className="menu___forms">
                        <AddBeverageForm
                          beverages={beverages}
                          setBeverages={setBeverages}
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
                                  beverages={beverages}
                                  setBeverages={setBeverages}
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
                                        backgroundColor: "darkred",
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
