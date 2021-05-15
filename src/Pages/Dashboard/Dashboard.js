import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../../components/Dashboard/Dashboard_card";
import './Dashboard.css';

const Dashboard = ({ userInfos }) => {
        
    const [nbOfGuests, setnbOfGuests] = useState()
    const [nbOfTables, setnbOfTables] = useState()
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

        async function getDatas(){
            let res = await Promise.all([guests, tables, menu])
            setnbOfGuests(res[0].data.length)
            setnbOfTables(res[1].data.length)
            setdetailedMenu(res[2].data)
        }
        getDatas();
    }, [])

    return(
        <div className="dashboard">
            <div className="dashboard___bgimage" />
            <div className="dashboard___title">
                <div className="dashboard___title_style">
                    <h2>Votre tableau de bord</h2>
                </div>
            </div>
            <div className="dashboard___elements container">
                <div className="elements___container dashboard___grid row row-cols-2 row-cols-md-2 row-cols-lg-3">
                    <Card 
                    title="Nombre de tables"
                    number={nbOfTables}
                    strip={cardColor[0]}
                    path={"/menu/tables"}
                    />
                    <Card 
                    title="Nombre d'invités"
                    number={nbOfGuests}
                    strip={cardColor[1]}
                    path={"/menu/invités"}
                    />
                    <Card 
                    title="Composition du menu"
                    detailedMenu={detailedMenu}
                    entrées={detailedMenu.starterID.length}
                    plats={detailedMenu.maincourseID.length}
                    desserts={detailedMenu.dessertID.length}
                    strip={cardColor[2]}
                    path={"/menu/carte"}
                    />
                    <Card 
                    title="Dépenses"
                    number="0"
                    strip={cardColor[3]}
                    // devise="€"
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;