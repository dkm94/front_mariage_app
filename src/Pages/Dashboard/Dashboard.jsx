import React, { useEffect, useState, useContext } from 'react';
import { ScrollButtonContext } from "../../App";
import './Dashboard.css';
import axios from 'axios';
import Card from "./Card/Card.jsx";

const Dashboard = () => {
    const scrollBtn = useContext(ScrollButtonContext)
    //const loader = useContext(LoaderContext)

    const [guests, setGuests] = useState();
    const [tables, setTables] = useState();
    const [operations, setOperations] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [maincourses, setMaincourses] = useState([]);
    const [starters, setStarters] = useState([]);
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        let guests = axios.get("/api/admin/guests/");
        let tables = axios.get("/api/admin/tables/");
        let operations = axios.get("/api/admin/budget/operations/");
        let todos = axios.get("/api/admin/todolist/");
        let starters = axios.get("/api/admin/menu/starters/");
        let maincourses = axios.get("/api/admin/menu/maincourses/");
        let desserts = axios.get("/api/admin/menu/desserts/");

        async function getDatas(){
            let res = await Promise.all([guests, tables, operations, todos, starters, maincourses, desserts])
            setGuests(res[0].data)
            setTables(res[1].data)
            setOperations(res[2].data)
            setTasks(res[3].data)
            setStarters(res[4].data)
            setMaincourses(res[5].data)
            setDesserts(res[6].data)
        }
        getDatas();
    }, [])

    let sum = operations.reduce((a, b) => a + b.price, 0)/100;
    function total(sum){
        return Number(sum).toFixed(2);
    }

    const isCompleted = tasks?.filter(task => task?.isCompleted);
    const notCompleted = tasks?.filter(task => !task?.isCompleted);

    const meal = starters?.length + maincourses?.length + desserts?.length;
    
    return(
        <div className="dashboard page-component">
            {scrollBtn}
            <div className="titles mb3">
                <h2>Que souhaitez-vous faire aujourd'hui ?</h2>
            </div>
            <div className="dashboard___bgimage">
                <div className="component-title" id="component-dashboard">
                    <h1>Tableau de bord</h1>
                </div>
            </div>
            <div className='home-cards__style' style={{ padding: "5rem" }}>
                <Card 
                    title={"Invités"} 
                    content={guests?.length} 
                    array={guests} 
                    resume={"lastAdded"} 
                    extraProp={"name"} 
                    path={"menu/invites"}
                />
                <Card 
                    title={"Tables"} 
                    content={tables?.length} 
                    array={tables} 
                    resume={"lastAdded"} 
                    extraProp={"name"}
                    path={"menu/tables"}
                />
                <Card 
                    title={"Plats"}
                    content={meal}
                    subArrayOne={starters?.length} 
                    subArrayTwo={maincourses?.length}
                    subArrayThree={desserts?.length}
                    resume={"composition"}
                    extraProp={"multiname"}
                    path={"menu/carte"}
                />
                <Card 
                    title={"Tâches"} 
                    content={tasks?.length}
                    subArrayOne={isCompleted?.length} 
                    subArrayTwo={notCompleted?.length}
                    array={tasks}
                    elements={"text"}
                    resume={"status"}
                    extraProp={"multiname"}
                    path={"menu/taches"}
                />
                <Card 
                    title={"Dépenses"} 
                    content={` ${total(sum)} €`}
                    array={operations}
                    elements={"description"}
                    resume={"lastAdded"}
                    extraProp={"description"}
                    path={"menu/budget"}
                    />
            </div>
        </div>
    )
}

export default Dashboard;