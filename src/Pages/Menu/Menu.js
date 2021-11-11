import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import { ScrollButtonContext } from "../../../src/App";
import CustomToggle from "../../components/Dots/Dots";
import Dropdown from "react-bootstrap/Dropdown";
import addIcon from "../../img/plus.png";
import axios from "axios";
import "./Menu.css";
import AddStarterForm from "./Forms/Add/AddStarter";
import AddMaincourseForm from "./Forms/Add/AddMaincourse";
import AddDessertForm from "./Forms/Add/AddDessert";
import UpdateStarter from "./Forms/Update/Starter";
import UpdateMaincourse from "./Forms/Update/Maincourse";
import UpdateDessert from "./Forms/Update/Dessert";

const Menus = () => {

    const scrollBtn = useContext(ScrollButtonContext)

    const [starters, setStarters] = useState([]);
    const [starter, setStarter] = useState({})

    const [maincourses, setMaincourses] = useState([]);
    const [maincourse, setMaincourse] = useState({})

    const [desserts, setDesserts] = useState([]);
    const [dessert, setDessert] = useState({})

    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })

    const [input, setInput] = useState('')

    const getUpdatedId = (objId, objName) => {
        setEdit({
            id: objId,
            name: objName
        })
        setInput(objName)
    }

    useEffect(() => {
        let starterData = axios.get("/api/admin/menu/starters/");
        let maincourseData = axios.get("/api/admin/menu/maincourses/");
        let dessertData = axios.get("/api/admin/menu/desserts/");
        async function getDatas(){
            let res = await Promise.all([starterData, maincourseData, dessertData])
            setStarters(res[0].data)
            setMaincourses(res[1].data)
            setDesserts(res[2].data)
        }
        getDatas();
    }, [starter, maincourse, dessert])


    const addStarter = newStarter => {
       setStarter(newStarter);
       setStarters([...starters, newStarter])
    }

    const addMaincourse = newMaincourse => {
        setMaincourse(newMaincourse);
        setMaincourses([...maincourses, newMaincourse])
    }

    const addDessert = newDessert => {
       setDessert(newDessert);
       setDesserts([...desserts, newDessert])
    }

    const editStarter = updatedStarter => {
        const updatedStartersList = [...starters].map((starter) => {
                if(starter._id === updatedStarter.id) {
                    starter.name = updatedStarter.name
                }
                return starter
            })
        setStarter(updatedStarter);
        setStarters(updatedStartersList);
    }

    const editMaincourse = updatedMaincourse => {
        const updatedMaincourseList= [...maincourses].map((maincourse) => {
            if(maincourse._id === edit.id) {
                maincourse.name = input
            }
            return maincourse
        })
        setMaincourse(updatedMaincourse);
        setMaincourses(updatedMaincourseList);
    }

    const editDessert = updatedDessert => {
        const updatedDessertList = [...desserts].map((dessert) => {
            if(dessert._id === edit.id) {
                dessert.name = input
            }
            return dessert
        })
        setMaincourse(updatedDessert);
        setMaincourses(updatedDessertList);
    }

    const deleteStarter = (id) => {
        axios.delete(`/api/admin/menu/starters/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setStarters(starters.filter(starter => starter._id !== id))
                }
            })
    }

    const deleteMaincourse = (id) => {
        axios.delete(`/api/admin/menu/maincourses/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setMaincourses(maincourses.filter(maincourse => maincourse._id !== id))
                }
            })
    }

    const deleteDessert = (id) => {
        axios.delete(`/api/admin/menu/desserts/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    setDesserts(desserts.filter(dessert => dessert._id !== id))
                }
            })
    }

    return(
        <div className="menu-container page-component">
            {scrollBtn}
            <div className="menu">
                <div className="page-location"><div><Link to={"/"} >Dashboard</Link>{'>'} Carte</div></div>
                <div className="menu___bgimage"><div className="component-title"><h1>La carte</h1></div></div>
                <div className="titles mb-3">
                    <h2>Avez-vous prévu une réception ?</h2>
                </div>
                <div className="menu__list__container">
                    <div className="menu___list">
                        <div className="starter forms">
                            <div className="starter___div_img">
                                <img src={starterImg} alt="starter"/>
                            </div>
                            <div className="starter___div_form fade-in fade-in">
                                {starters.length === 0 || starters.length === 1 ? <h3>Entrée</h3> : <h3>Entrées</h3>}
                                <div className="menu___forms">
                                    <AddStarterForm addStarter={addStarter} icon={addIcon} />
                                </div>
                                {starters.length === 0 ? (<div className="empty-div"><span>Vos entrées ici</span></div>) : (<ul>
                                    {
                                        starters.map((starter) => <li key={starter._id} >
                                            {edit.id === starter._id ? 
                                            (<UpdateStarter edit={edit} setEdit={setEdit} editStarter={editStarter} />) : 
                                            (<span>{starter.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                <div className="custom-dropdown">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle} />
                                                        <Dropdown.Menu size="sm" title="">
                                                            {edit.id ? (<>
                                                                <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                                                <Dropdown.Item onClick={(e) => {editStarter(e)}}>Valider</Dropdown.Item>
                                                            </>) : (<>
                                                                <Dropdown.Item onClick={() => getUpdatedId(starter._id, starter.name)}>Modifier</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {deleteStarter(starter._id)}}>Supprimer</Dropdown.Item>
                                                            </>)}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </li>)
                                    }
                                </ul>)  }
                            </div>
                        </div>
                        <div className="maincourse forms" id="forms_reverse">
                            <div className="maincourse___div_form fade-in fade-in">
                            {maincourses.length === 0 || maincourses.length === 1 ? <h3>Plat</h3> : <h3>Plats</h3>}
                                <div className="menu___forms">
                                    <AddMaincourseForm addMaincourse={addMaincourse} icon={addIcon} />
                                </div>
                                {maincourses.length === 0 ? (<div className="empty-div"><span>Vos plats ici</span></div>) : (<ul>
                                    {
                                        maincourses.map((maincourse) => <li key={maincourse._id} >
                                            {edit.id === maincourse._id ? 
                                            (<UpdateMaincourse edit={edit} setEdit={setEdit} editMaincourse={editMaincourse} />) : 
                                            (<span>{maincourse.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                <div className="custom-dropdown">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle} />
                                                        <Dropdown.Menu size="sm" title="">
                                                            {edit.id ? (<>
                                                                <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                                                <Dropdown.Item onClick={(e) => {editMaincourse(e)}}>Valider</Dropdown.Item>
                                                            </>) : (<>
                                                                <Dropdown.Item onClick={() => getUpdatedId(maincourse._id, maincourse.name)}>Modifier</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {deleteMaincourse(maincourse._id)}}>Supprimer</Dropdown.Item>
                                                            </>)}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </li>)
                                        }
                                </ul>)}
                            </div>
                            <div className="maincourse___div_img">
                                <img src={maincourseImg} alt="main couse" />
                            </div>
                        </div>
                        <div className="dessert forms">
                            <div className="dessert___div_img">
                                <img src={dessertImg} alt="dessert" />
                            </div>
                            <div className="dessert___div_form fade-in">
                            {desserts.length === 0 || desserts.length === 1 ? <h3>Dessert</h3> : <h3>Desserts</h3>}
                                <div className="menu___forms">
                                    <AddDessertForm addDessert={addDessert} icon={addIcon} />
                                </div>
                                {desserts.length === 0 ? (<div className="empty-div"><span>Vos desserts ici</span></div>) : (<ul>
                                    {
                                        desserts.map((dessert) => <li key={dessert._id} >
                                            {edit.id === dessert._id ? 
                                            (<UpdateDessert edit={edit} setEdit={setEdit} editDessert={editDessert} />) : 
                                            (<span>{dessert.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                <div className="custom-dropdown">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as={CustomToggle} />
                                                        <Dropdown.Menu size="sm" title="">
                                                            {edit.id ? (<>
                                                                <Dropdown.Item onClick={() => setEdit({id: null})}>Annuler</Dropdown.Item>
                                                                <Dropdown.Item onClick={(e) => {editDessert(e)}}>Valider</Dropdown.Item>
                                                            </>) : (<>
                                                                <Dropdown.Item onClick={() => getUpdatedId(dessert._id, dessert.name)}>Modifier</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {deleteDessert(dessert._id)}}>Supprimer</Dropdown.Item>
                                                            </>)}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </li>)
                                    }
                                </ul>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menus;
