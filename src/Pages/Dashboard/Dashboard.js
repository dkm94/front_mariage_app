import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../../components/Dashboard/Dashboard_card";
import './Dashboard.css';

const Dashboard = ({ userInfos }) => {
        
    const [nbOfGuests, setnbOfGuests] = useState();
    const [nbOfTables, setnbOfTables] = useState();
    const [operations, setOperations] = useState([]);
    const [detailedMenu, setdetailedMenu] = useState({
        starterID: '', maincourseID: '', dessertID: ''
    })

    const cardColor = [
        '#F9E1E0',
        '#FEADB9',
        '#BC85A3',
        '#9799BA'
    ]

    useEffect(() => {
        let guests = axios.get("/api/admin/guests/");
        let tables = axios.get("/api/admin/tables/");
        let menu = axios.get("/api/admin/menu/");
        let operations = axios.get("/api/admin/budget/operations/");

        async function getDatas(){
            let res = await Promise.all([guests, tables, menu, operations])
            setnbOfGuests(res[0].data.length)
            setnbOfTables(res[1].data.length)
            setdetailedMenu(res[2].data)
            setOperations(res[3].data)
        }
        getDatas();
    }, [])

    let sum = operations.reduce((a, b) => a + b.price, 0)/100;
    function total(sum){
        return Number(sum).toFixed(2);
    }

    return(
        <div className="dashboard">
            <div className="dashboard___bgimage" />
            <div className="dashboard___title">
                <div className="dashboard___title_style">
                    <h2>Votre tableau de bord</h2>
                </div>
            </div>
            <div className="dashboard___elements container">
                <div className="elements___container dashboard___grid row">
                    <Card
                    responsive={"col-sm-8 col-md-6 col-xl-4"}
                    title="Nombre de tables"
                    number={nbOfTables}
                    strip={cardColor[0]}
                    path={"/menu/tables"}
                    />
                    <Card
                    responsive={"col-sm-8 col-md-6 col-xl-4"}
                    title="Nombre d'invités"
                    number={nbOfGuests}
                    strip={cardColor[1]}
                    path={"/menu/invités"}
                    />
                    <Card
                    responsive={"col-sm-8 col-md-6 col-xl-4"}
                    title="Composition du menu"
                    detailedMenu={detailedMenu}
                    entrées={detailedMenu.starterID.length}
                    plats={detailedMenu.maincourseID.length}
                    desserts={detailedMenu.dessertID.length}
                    strip={cardColor[2]}
                    path={"/menu/carte"}
                    />
                    <Card
                    responsive={"col-sm-8 col-md-6 col-xl-6"}
                    title="Dépenses"
                    number={total(sum)}
                    strip={cardColor[3]}
                    path={"/menu/budget"}
                    // devise="€"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;