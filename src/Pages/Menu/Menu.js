import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const Menus = () => {
    const [editingText, seteditingText] = useState('')

    const [starters, setStarters] = useState([]);
    const [starter, setStarter] = useState({name:""})
    const [starterEditing, setstarterEditing] = useState(null)

    const [maincourses, setMaincourses] = useState([]);
    const [maincourse, setMaincourse] = useState({name:""})
    const [maincourseEditing, setmaincourseEditing] = useState(null)

    const [desserts, setDesserts] = useState([]);
    const [dessert, setDessert] = useState({name:""})
    const [dessertEditing, setdessertEditing] = useState(null)

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
            console.log(res.data)
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

    const editStarter = (id) => {
        const updatedStarters = [...starters].map((starter) => {
            if(starter._id === id) {
                starter.name = editingText
            }
            return starter
        })
        axios.put(`/api/admin/menu/starters/edit/${id}`, {name: editingText})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setStarters(updatedStarters)
                        setstarterEditing(null)
                        seteditingText('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editMaincourse = (id) => {
        const updatedMaincourses = [...maincourses].map((maincourse) => {
            if(maincourse._id === id) {
                maincourse.name = editingText
            }
            return maincourse
        })
        axios.put(`/api/admin/menu/maincourses/edit/${id}`, {name: editingText})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setMaincourses(updatedMaincourses)
                        setmaincourseEditing(null)
                        seteditingText('')
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editDessert = (id) => {
        const updatedDesserts = [...desserts].map((dessert) => {
            if(dessert._id === id) {
                dessert.name = editingText
            }
            return dessert
        })
        axios.put(`/api/admin/menu/desserts/edit/${id}`, {name: editingText})
            .then((res) => {
                if(res.data != null){
                    setTimeout(() => {
                        setDesserts(updatedDesserts)
                        setdessertEditing(null)
                        seteditingText('')
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
                    // alert("L'entrée a été supprimée.");
                    setStarters(starters.filter(starter => starter._id !== id))
                }
            })
    }

    const deleteMaincourse = (id) => {
        axios.delete(`/api/admin/menu/maincourses/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    // alert("Le plat a été supprimé.");
                    setMaincourses(maincourses.filter(maincourse => maincourse._id !== id))
                }
            })
    }

    const deleteDessert = (id) => {
        axios.delete(`/api/admin/menu/desserts/delete/${id}`)
            .then(res => {
                if(res.data != null) {
                    // alert("Le dessert a été supprimé.");
                    setDesserts(desserts.filter(dessert => dessert._id !== id))
                }
            })
    }

    return(
        <div className="menu-container">
            <div className="menu">
                <div className="menu___bgimage" />
                <div className="menu___title">
                    <div className="menu___title_style">
                        <h1>Menu</h1>
                    </div>
                </div>
                <div className="menu___list container">
                    <div className="starter forms">
                        <h2>Entrée</h2>
                        <div className="menu___forms">
                            <form onSubmit={submitStarter}>
                                <input
                                type="text"
                                name="name" 
                                value={starter.name} 
                                onChange={handleStarter}
                                required
                                />
                                <button type="submit">OK</button>
                            </form>
                        </div>
                        <ul>
                            {
                                starters.map((starter) => <li key={starter._id} >
                                    {starterEditing === starter._id ? 
                                    (<input 
                                        type="text" 
                                        onChange={(e) => {seteditingText(e.target.value)}} 
                                        value={editingText}
                                    />) : 
                                    (<span>{starter.name}</span>)}
                                    
                                    <div className="menu___li-btns">
                                        {starterEditing === starter._id ? 
                                        (<button onClick={() => {editStarter(starter._id)}}>
                                            <i className="fas fa-check"/>
                                        </button>) : 
                                        (<button onClick={() => setstarterEditing(starter._id)}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>)}
                                        
                                        <button className="del-btn" onClick={() => {deleteStarter(starter._id)}}>
                                            <i className="fas fa-trash"/>
                                        </button>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className="maincourse forms">
                        <h2>Plat</h2>
                        <div className="menu___forms">
                            <form onSubmit={submitMaincourse}>
                                <input
                                type="text"
                                name="name" 
                                value={maincourse.name} 
                                onChange={handleMaincourse}
                                required
                                />
                                <button type="submit">OK</button>
                            </form>

                        </div>
                        <ul>
                            {
                                maincourses.map((maincourse) => <li key={maincourse._id} >
                                    {maincourseEditing === maincourse._id ? 
                                    (<input 
                                        type="text" 
                                        onChange={(e) => {seteditingText(e.target.value)}} 
                                        value={editingText}
                                    />) : 
                                    (<span>{maincourse.name}</span>)}
                                    
                                    <div className="menu___li-btns">
                                        {maincourseEditing === maincourse._id ? 
                                        (<button onClick={() => {editMaincourse(maincourse._id)}}>
                                            <i className="fas fa-check"/>
                                        </button>) : 
                                        (<button onClick={() => setmaincourseEditing(maincourse._id)}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>)}
                                        
                                        <button className="del-btn" onClick={() => {deleteMaincourse(maincourse._id)}}>
                                            <i className="fas fa-trash"/>
                                        </button>
                                    </div>
                                </li>)
                                }
                        </ul>
                    </div>
                    <div className="dessert forms">
                        <h2>Dessert</h2>
                        <div className="menu___forms">
                            <form onSubmit={submitDessert}>
                                <input
                                type="text"
                                name="name" 
                                value={dessert.name} 
                                onChange={handleDessert}
                                required
                                />
                                <button type="submit">OK</button>
                            </form>
                        </div>
                        <ul>
                            {
                                desserts.map((dessert) => <li key={dessert._id} >
                                    {dessertEditing === dessert._id ? 
                                    (<input 
                                        type="text" 
                                        onChange={(e) => {seteditingText(e.target.value)}} 
                                        value={editingText}
                                    />) : 
                                    (<span>{dessert.name}</span>)}
                                    
                                    <div className="menu___li-btns">
                                        {dessertEditing === dessert._id ? 
                                        (<button onClick={() => {editDessert(dessert._id)}}>
                                            <i className="fas fa-check"/>
                                        </button>) : 
                                        (<button onClick={() => setdessertEditing(dessert._id)}>
                                            <i className="fas fa-pencil-alt"/>
                                        </button>)}
                                        
                                        <button className="del-btn" onClick={() => {deleteDessert(dessert._id)}}>
                                            <i className="fas fa-trash"/>
                                        </button>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menus;
