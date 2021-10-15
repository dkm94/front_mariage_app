import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import Card from "../../components/Dashboard/Dashboard_card";
// import PieChart from "../../components/Expenses/Graph/PieChart"
import { LoaderContext, ScrollButtonContext } from "../../../src/App";
import './Dashboard.css';

const Dashboard = (props) => {

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
    

    return(
        <div className="dashboard page-component">
            {scrollBtn}
            <div className="dashboard___bgimage">
                <div className="glass-div">
                    <h1>Que souhaitez-vous faire aujourd'hui ?</h1>
                </div>
            </div>
            
            <div className="dashboard___elements">
                <div className="grid-container">
                    <div className="item1">
                        <div className="item__title"><h2>Invités</h2></div>
                        <div className="guests__resume___container">
                            {/* <div className="item__resume">
                                <div className="item__resume__style">
                                    <h3>Derniers invités ajoutés</h3>
                                    <ul className="dashboard__ul">{guests === undefined ? loader : (
                                        guests.slice(Math.max(guests.length - 5, 1)).map(guest => <li key={guest._id}>{guest.name}</li>)
                                    )}</ul>
                                </div>
                            </div> */}
                            <div className="item__total">
                                <div className="item__resume__style"><h3>Total des invités</h3></div>
                                <div className="sum"><span>{guests === undefined ? loader : guests.length}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/invites`}>Voir plus...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="item__title"><h2>Tables</h2></div>
                        <div className="tables__resume___container">
                            <div className="item__resume__style"><h3>Total des tables</h3></div> 
                            <div>
                                <div className="sum"><span>{nbOfTables}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/tables`}>Voir plus...</Link>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="item3">
                        <div className="item__title"><h2>Tâches</h2></div>
                        <div className="tasks__resume___container">
                            <div className="task__count">
                                <p>
                                    <span>Effectuées: </span>
                                    <span>Restantes: </span>
                                </p>
                            </div>
                            <div className="sum"><span>{tasks === undefined ? loader : tasks.length}</span></div>
                            <div className="show-more">
                                <Link to={`/menu/taches`}>Voir plus...</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item4">
                        <div className="item__title"><h2>Menu</h2></div>
                        <div className="menu__resume___container">
                            <div className="menu__resume___grid">
                                <div>
                                    <div className="item__resume__style"><h3>{detailedMenu.starterID.length > 0 ? "Entrées" : "Entrée"}</h3></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.starterID.length}</span></div>
                                </div>
                                <div>
                                    <div className="item__resume__style"><h3>{detailedMenu.maincourseID.length > 0 ? "Plats" : "Plat"}</h3></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.maincourseID.length}</span></div>
                                </div>
                                <div>
                                    <div className="item__resume__style"><h3>{detailedMenu.dessertID.length > 0 ? "Desserts" : "Dessert"}</h3></div> 
                                    <div className="sum"><span>{detailedMenu === undefined ? loader : detailedMenu.dessertID.length}</span></div>
                                </div>
                            </div>
                            <div className="show-more">
                                <Link to={`/menu/carte`}>Voir plus...</Link>
                            </div>
                        </div>
                    </div>
                    <div className="item5">
                        <div className="item__title"><h2>Dépenses</h2></div>
                        <div className="expenses__resume___container">
                            {/* <div className="item__resume">
                                <div className="item__resume__style">
                                    <h3>Vos dernières dépenses</h3>
                                    <ul className="dashboard__ul">{expensesSliced.map(expense => <li key={expense._id}>{expense.description}</li>)}</ul>
                                </div>
                                <div className="show-more">
                                    <Link to={`/menu/budget`}>Voir plus...</Link>
                                </div>
                            </div> */}
                            <div className="item__total">
                                <div className="item__resume__style"><h3>Total des dépenses</h3></div>
                                <div className="sum"><span>{operations === undefined ? loader :` ${total(sum)} €`}</span></div>
                                <div className="show-more">
                                    <Link to={`/menu/budget`}>Voir plus...</Link>
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