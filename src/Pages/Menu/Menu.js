import React, { useState, useEffect, useRef, useContext } from "react";
import starterImg from "../../img/menus/starter_img.jpg";
import maincourseImg from "../../img/menus/maincourse_img.jpg";
import dessertImg from "../../img/menus/dessert_img.jpg";
import { ScrollButtonContext } from "../../../src/App";
import axios from "axios";
import "./Menu.css";

const Menus = (props) => {
    console.log(props)

    const scrollBtn = useContext(ScrollButtonContext)

    const [starters, setStarters] = useState([]);
    const [starter, setStarter] = useState({name:""})

    const [maincourses, setMaincourses] = useState([]);
    const [maincourse, setMaincourse] = useState({name:""})

    const [desserts, setDesserts] = useState([]);
    const [dessert, setDessert] = useState({name:""})

    const [edit, setEdit] = useState({
        id: null,
        name: ''
    })

    const [input, setInput] = useState('')

    const inputRef = useRef(null);

    const handleUpdate = (e) => {
        setInput(e.target.value)
    }

    const getUpdatedId = (objId, objName) => {
        setEdit({
            id: objId,
            name: objName
        })
        setInput(objName)
    }


    const handleStarter = (e) => {
        const {value, name} = e.target;
        setStarter(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleMaincourse = (e) => {
        const {value, name} = e.target;
        setMaincourse(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDessert = (e) => {
        const {value, name} = e.target;
        setDessert(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/menu/starters/")
            setStarters(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/menu/maincourses/")
            setMaincourses(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/admin/menu/desserts/")
            setDesserts(result.data)
        }
        fetchData();
    }, [])


    const submitStarter = (e) => {
        e.preventDefault();
        axios.get("/api/admin/menu")
        .then((res) => {
            const data = res.data;
            const result = data._id
            if(data){
                axios.post(`/api/admin/menu/starters/add/${result}`,starter)
                .then((res) => {
                    if(res.data != null){
                        setStarters([...starters, starter])
                        setStarter({name:""})
                    }
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const submitMaincourse = (e) => {
        e.preventDefault();
        axios.get("/api/admin/menu")
        .then((res) => {
            const data = res.data;
            const result = data._id
            if(data){
                axios.post(`/api/admin/menu/maincourses/add/${result}`,maincourse)
                .then((res) => {
                    if(res.data != null){
                        setMaincourses([...maincourses, maincourse])
                        setMaincourse({name:""})
                    }
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const submitDessert = (e) => {
        e.preventDefault();
        axios.get("/api/admin/menu")
        .then((res) => {
            const data = res.data;
            const result = data._id
            if(data){
                axios.post(`/api/admin/menu/desserts/add/${result}`,dessert)
                .then((res) => {
                    if(res.data != null){
                        setDesserts([...desserts, dessert])
                        setDessert({name:""})
                    }
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const editStarter = (e) => {
        e.preventDefault()
        const updatedStarters = [...starters].map((starter) => {
            if(starter._id === edit.id) {
                starter.name = input
            }
            return starter
        })
        axios.post(`/api/admin/menu/starters/edit/${edit.id}`, {name: input})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setStarters(updatedStarters)
                        setEdit('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editMaincourse = (e) => {
        e.preventDefault()
        const updatedMaincourses = [...maincourses].map((maincourse) => {
            if(maincourse._id === edit.id) {
                maincourse.name = input
            }
            return maincourse
        })
        axios.post(`/api/admin/menu/maincourses/edit/${edit.id}`, {name: input})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setMaincourses(updatedMaincourses)
                        setEdit('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editDessert = (e) => {
        e.preventDefault()
        const updatedDesserts = [...desserts].map((dessert) => {
            if(dessert._id === edit.id) {
                dessert.name = input
            }
            return dessert
        })
        axios.post(`/api/admin/menu/desserts/edit/${edit.id}`, {name: input})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setDesserts(updatedDesserts)
                        setEdit('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
                <div className="menu___bgimage">
                    <div class="glass-div mb-3">
                        <h1>Avez-vous prévu une réception ?</h1>
                    </div>
                </div>
                <div className="menu__list__container">
                    <div className="menu___list">
                        <div className="starter forms">
                            <div className="starter___div_img">
                                <img src={starterImg} alt="starter"/>
                            </div>
                            <div className="starter___div_form">
                                {starters.length === 0 || starters.length === 1 ? <h2>Entrée</h2> : <h2>Entrées</h2>}
                                <div className="menu___forms">
                                    <form onSubmit={submitStarter}>
                                        <input
                                        type="text"
                                        
                                        name="name" 
                                        value={starter.name} 
                                        onChange={handleStarter}
                                        required
                                        />
                                        <button type="submit" className="btn shadow-none"><i className="fas fa-check" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                                {starters.length === 0 ? (<div style={{ textAlign: "center"}}><span>Vos entrées ici</span></div>) : (<ul>
                                    {
                                        starters.map((starter) => <li key={starter._id} >
                                            {edit.id === starter._id ? 
                                            (<form onSubmit={editStarter}>
                                                <input 
                                                type="text"
                                                
                                                onChange={handleUpdate} 
                                                value={input}
                                                ref={inputRef}
                                                />
                                            </form>) : 
                                            (<span>{starter.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                {edit.id === starter._id ? 
                                                (<><button onClick={(e) => {editStarter(e)}}>
                                                    <i className="fas fa-check"/>
                                                </button>
                                                <button onClick={() => setEdit({id: null})}>
                                                    <i className="fas fa-undo"/>
                                                </button>
                                                </>
                                                ) : 
                                                (<button onClick={() => getUpdatedId(starter._id, starter.name)}>
                                                    <i className="fas fa-pencil-alt"/>
                                                </button>)}
                                                
                                                <button className="del-btn" onClick={() => {deleteStarter(starter._id)}}>
                                                    <i className="fas fa-trash"/>
                                                </button>
                                            </div>
                                        </li>)
                                    }
                                </ul>)  }
                            </div>
                        </div>
                        <div className="maincourse forms" id="forms_reverse">
                            <div className="maincourse___div_form">
                            {maincourses.length === 0 || maincourses.length === 1 ? <h2>Plat</h2> : <h2>Plats</h2>}
                                <div className="menu___forms">
                                    <form onSubmit={submitMaincourse}>
                                        <input
                                        type="text"
                                        
                                        name="name" 
                                        value={maincourse.name} 
                                        onChange={handleMaincourse}
                                        required
                                        />
                                        <button type="submit" className="btn shadow-none"><i className="fas fa-check" aria-hidden="true"></i></button>
                                    </form>

                                </div>
                                {maincourses.length === 0 ? (<div style={{ textAlign: "center"}}><span>Vos plats ici</span></div>) : (<ul>
                                    {
                                        maincourses.map((maincourse) => <li key={maincourse._id} >
                                            {edit.id === maincourse._id ? 
                                            (<form onSubmit={editMaincourse}>
                                                <input 
                                                type="text"
                                                
                                                onChange={handleUpdate} 
                                                value={input}
                                                ref={inputRef}
                                                />
                                            </form>) : 
                                            (<span>{maincourse.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                {edit.id === maincourse._id ? 
                                                (<>
                                                    <button onClick={(e) => {editMaincourse(e)}}>
                                                        <i className="fas fa-check"/>
                                                    </button>
                                                    <button onClick={() => setEdit({id: null})}>
                                                    <i className="fas fa-undo"/>
                                                    </button>
                                                </>) : 
                                                (<button onClick={() => getUpdatedId(maincourse._id, maincourse.name)}>
                                                    <i className="fas fa-pencil-alt"/>
                                                </button>)}
                                                
                                                <button className="del-btn" onClick={() => {deleteMaincourse(maincourse._id)}}>
                                                    <i className="fas fa-trash"/>
                                                </button>
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
                            <div className="dessert___div_form">
                            {desserts.length === 0 || desserts.length === 1 ? <h2>Dessert</h2> : <h2>Desserts</h2>}
                                <div className="menu___forms">
                                    <form onSubmit={submitDessert}>
                                        <input
                                        type="text"
                                        
                                        name="name" 
                                        value={dessert.name} 
                                        onChange={handleDessert}
                                        required
                                        />
                                        <button type="submit" className="btn shadow-none"><i className="fas fa-check" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                                {desserts.length === 0 ? (<div style={{ textAlign: "center"}}><span>Vos desserts ici</span></div>) : (<ul>
                                    {
                                        desserts.map((dessert) => <li key={dessert._id} >
                                            {edit.id === dessert._id ? 
                                            (<form onSubmit={editDessert}>
                                                <input 
                                                type="text"
                                                
                                                onChange={handleUpdate} 
                                                value={input}
                                                ref={inputRef}
                                                />
                                            </form>) : 
                                            (<span>{dessert.name}</span>)}
                                            
                                            <div className="menu___li-btns">
                                                {edit.id === dessert._id ? 
                                                (<>
                                                    <button onClick={(e) => {editDessert(e)}}>
                                                        <i className="fas fa-check"/>
                                                    </button>
                                                    <button onClick={() => setEdit({id: null})}>
                                                    <i className="fas fa-undo"/>
                                                    </button>
                                                </>) : 
                                                (<button onClick={() => getUpdatedId(dessert._id, dessert.name)}>
                                                    <i className="fas fa-pencil-alt"/>
                                                </button>)}
                                                
                                                <button className="del-btn" onClick={() => {deleteDessert(dessert._id)}}>
                                                    <i className="fas fa-trash"/>
                                                </button>
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
