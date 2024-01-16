import "./Menu.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import apetizerImg from "../../img/menus/apetizers.jpg";
import beverageImg from "../../img/menus/beverages.jpg";

import Grow from "@mui/material/Grow";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import { AddStarterForm, AddMaincourseForm, AddDessertForm, AddApetizerForm, AddBeverageForm } from "./Forms/Add";
import { UpdateStarter, UpdateMaincourse, UpdateDessert, UpdateApetizer, UpdateBeverage } from "./Forms/Update";

import { FoodType } from "../../../types";
import { useFetch } from "../../hooks";
import { getApetizers, getBeverages, getDesserts, getMaincourses, getStarters } from "../../services";
import ContentLayout from "../../components/LayoutPage/ContentLayout/ContentLayout";


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
  const [loading, setLoading] = useState<boolean>(false);

  const { data: starters, setData: setStarters } = useFetch<void, FoodType[]>(getStarters, []);
  const { data: maincourses,setData: setMaincourses} = useFetch<void, FoodType[]>(getMaincourses, []);
  const { data: desserts, setData: setDesserts } = useFetch<void, FoodType[]>(getDesserts, []);
  const { data: apetizers, setData: setApetizers } = useFetch<void, FoodType[]>(getApetizers, []);
  const { data: beverages, setData: setBeverages } = useFetch<void, FoodType[]>(getBeverages, []);

  useEffect(() => {
    setLoading(true);

    if(starters && maincourses && desserts && apetizers && beverages) {
      setLoading(false);
    }
  }, [starters, maincourses, desserts, apetizers, beverages])
  
  const [edit, setEdit] = useState<EditType>({
    id: "",
    name: "",
  });


  const getUpdatedId = (objId, objName) => {
    setEdit({
      id: objId,
      name: objName,
    });
  };

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
    <ContentLayout loading={loading} title={"Avez-vous prévu une réception ?"} src={"reception"}>
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
    </ContentLayout>
  );
};

export default Menus;
