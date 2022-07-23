import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { LoaderContext, ScrollButtonContext } from "../../../src/App";
import groupIcon from "../../img/SidebareIcons/guests.png";
import tableIcon from "../../img/SidebareIcons/tables.png";
import menuIcon from "../../img/SidebareIcons/menu.png";
import todoIcon from "../../img/SidebareIcons/todo.png";
import calculatorIcon from "../../img/SidebareIcons/money.png";
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {

    
    const scrollBtn = useContext(ScrollButtonContext)
    const loader = useContext(LoaderContext)

    const [guests, setGuests] = useState();
    const [nbOfTables, setnbOfTables] = useState();
    const [operations, setOperations] = useState([]);
    const [detailedMenu, setdetailedMenu] = useState({
        starterID: '', maincourseID: '', dessertID: ''
    })
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let guests = axios.get("/api/admin/guests/");
        let tables = axios.get("/api/admin/tables/");
        let menu = axios.get("/api/admin/menu/");
        let operations = axios.get("/api/admin/budget/operations/");
        let todos = axios.get("/api/admin/todolist/");

        async function getDatas(){
            let res = await Promise.all([guests, tables, menu, operations, todos])
            setGuests(res[0].data)
            setnbOfTables(res[1].data.length)
            setdetailedMenu(res[2].data)
            setOperations(res[3].data)
            setTasks(res[4].data)
        }
        getDatas();
    }, [])

    let sum = operations.reduce((a, b) => a + b.price, 0)/100;
    function total(sum){
        return Number(sum).toFixed(2);
    }

    // const expensesSliced = operations.slice(Math.max(operations.length - 5, 1));
    const isCompleted = tasks.filter(task => task.isCompleted);
    const notCompleted = tasks.filter(task => !task.isCompleted);
    

    return(
        <div className="dashboard page-component">
            {scrollBtn}
            <div className="titles mb3">
                <h2>Que souhaitez-vous faire aujourd'hui ?</h2>
            </div>
            <div className="dashboard___bgimage"><div className="component-title" id="component-dashboard"><h1>Tableau de bord</h1></div></div>
            <div className="dashboard___elements">
                <div className="grid-container">
                    <div className="item">
                        <div className="item__title">
                            {/* <div className="dashboard-icon" id="bg-item1" >
                                <img src={groupIcon} alt="icône invités" />
                            </div> */}
                            <div className="dashboard-title"><h2>Invités</h2></div>
                        </div>
                        <div><span>Total</span></div>
                        <div className="guests__resume___container">
                            <div className="item__total">
                                <div className="sum"><span>{guests === undefined ? loader : guests.length}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/invites`}>Voir plus  →</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item__title">
                            {/* <div className="dashboard-icon" id="bg-item2" >
                                <img src={tableIcon} alt="icône tables" />
                            </div> */}
                            <div className="dashboard-title"><h2>Tables</h2></div>
                        </div>
                        <div><span>Total</span></div>
                        <div className="tables__resume___container">
                            <div>
                                <div className="sum"><span>{nbOfTables}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/tables`}>Voir plus  →</Link>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="item">
                        <div className="item__title">
                            {/* <div className="dashboard-icon" id="bg-item3" >
                                <img src={todoIcon} alt="icône tâches" />
                            </div> */}
                            <div className="dashboard-title"><h2>Tâches</h2></div>                      
                        </div>
                        <div className="tasks__resume___container">
                            <div className="task-count">
                                <div className="task-count__element">
                                    <span>Effectuées:</span>
                                    <span className="sum">{isCompleted.length}</span>
                                </div>
                                <div className="task-count__element">
                                    <span>Restantes:</span>
                                    <span className="sum">{notCompleted.length}</span>
                                </div>
                            </div>
                            {/* <div className="sum"><span>{tasks === undefined ? loader : tasks.length}</span></div> */}
                            <div className="show-more">
                                <Link to={`/menu/taches`}>Voir plus  →</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item__title">
                            {/* <div className="dashboard-icon" id="bg-item4" >
                                <img src={menuIcon} alt="icône menu" />
                            </div> */}
                            <div className="dashboard-title"><h2>Carte</h2></div>
                        </div>
                        <div className="menu__resume___container">
                            <div className="menu__resume___grid">
                                <div>
                                    <div><span>{detailedMenu.starterID.length > 0 ? "Entrées" : "Entrée"}</span></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.starterID.length}</span></div>
                                </div>
                                <div>
                                    <div><span>{detailedMenu.maincourseID.length > 0 ? "Plats" : "Plat"}</span></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.maincourseID.length}</span></div>
                                </div>
                                <div>
                                    <div><span>{detailedMenu.dessertID.length > 0 ? "Desserts" : "Dessert"}</span></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.dessertID.length}</span></div>
                                </div>
                            </div>
                            <div className="show-more">
                                <Link to={`/menu/carte`}>Voir plus  →</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item__title">
                            {/* <div className="dashboard-icon" id="bg-item5">
                                <img src={calculatorIcon} alt="icône calculatrice" />
                            </div> */}
                            <div className="dashboard-title"><h2>Budget</h2></div>
                        </div>        
                        <div><span>Total</span></div>
                        <div className="expenses__resume___container">
                            <div className="item__total">
                                <div className="sum"><span>{operations === undefined ? loader :` ${total(sum)} €`}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/budget`}>Voir plus  →</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                      
                    
                    
                    {/* <Card
                    responsive={"col-sm-8 col-xl-6"}
                    title="Nombre de tables"
                    number={nbOfTables}
                    strip={cardColor[0]}
                    path={"/menu/tables"}
                    />
                    <Card
                    responsive={"col-sm-8 col-xl-6"}
                    title="Nombre d'invités"
                    number={nbOfGuests}
                    strip={cardColor[1]}
                    path={"/menu/invites"}
                    />
                    <Card
                    responsive={"col-sm-8 col-xl-6"}
                    title="Composition du menu"
                    detailedMenu={detailedMenu}
                    entrées={detailedMenu.starterID.length}
                    plats={detailedMenu.maincourseID.length}
                    desserts={detailedMenu.dessertID.length}
                    strip={cardColor[2]}
                    path={"/menu/carte"}
                    />
                    <Card
                    responsive={"col-sm-8 col-xl-6"}
                    title="Dépenses"
                    number={total(sum)}
                    strip={cardColor[3]}
                    path={"/menu/budget"}
                    // devise="€"
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;