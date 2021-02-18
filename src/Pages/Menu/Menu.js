import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const Menus = () => {
    const [starters, setStarters] = useState([]);
    const [starter, setStarter] = useState({name:""})
    const [maincourses, setMaincourses] = useState([]);
    const [maincourse, setMaincourse] = useState({name:""})
    const [desserts, setDesserts] = useState([]);
    const [dessert, setDessert] = useState({name:""})
    const [toggle, setToggle] = useState(false)

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
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/menu/starters/", config)
            setStarters(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/menu/maincourses/", config)
            setMaincourses(result.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/menu/desserts/", config)
            setDesserts(result.data)
        }
        fetchData();
    }, [])


    const submitStarter = (e) => {
        alert("submitted!");
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
          };
        axios.get("/api/admin/menu", config)
        .then((res) => {
            console.log(res.data)
            let data;
            data = res.data;
            const result = data._id
            console.log(result)
            if(data){
                axios.post(`/api/admin/menu/starters/add/${result}`,starter, config)
                .then((res) => {
                console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const submitMaincourse = (e) => {
        alert("submitted!");
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
          };
        axios.get("/api/admin/menu", config)
        .then((res) => {
            console.log(res.data)
            let data;
            data = res.data;
            const result = data._id
            console.log(result)
            if(data){
                axios.post(`/api/admin/menu/maincourses/add/${result}`,maincourse, config)
                .then((res) => {
                console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const submitDessert = (e) => {
        alert("submitted!");
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
          };
        axios.get("/api/admin/menu", config)
        .then((res) => {
            console.log(res.data)
            let data;
            data = res.data;
            const result = data._id
            console.log(result)
            if(data){
                axios.post(`/api/admin/menu/desserts/add/${result}`,dessert, config)
                .then((res) => {
                console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)})
                }
        })
    }

    const deleteStarter = (id) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };
        axios.delete(`/api/admin/menu/starters/delete/${id}`, config)
            .then(res => {
                if(res.data != null) {
                    alert("L'entrée a été supprimée.");
                    setStarters(starters.filter(starter => starter._id !== id))
                }
            })
    }

    const deleteMaincourse = (id) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };
        axios.delete(`/api/admin/menu/maincourses/delete/${id}`, config)
            .then(res => {
                if(res.data != null) {
                    alert("Le plat a été supprimé.");
                    setMaincourses(maincourses.filter(maincourse => maincourse._id !== id))
                }
            })
    }

    const deleteDessert = (id) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };
        axios.delete(`/api/admin/menu/desserts/delete/${id}`, config)
            .then(res => {
                if(res.data != null) {
                    alert("Le dessert a été supprimé.");
                    setDesserts(desserts.filter(dessert => dessert._id !== id))
                }
            })
    }

   const showInput = (id) => {
        setToggle(!toggle)
   }


    const entrée = starters.map((starter) => <li key={starter._id} >{starter.name}<button onClick={() => {showInput(starter._id)}}>E</button><button onClick={() => {deleteStarter(starter._id)}}><i className="fas fa-trash"/></button></li>)
    const plat = maincourses.map((maincourse) => <li key={maincourse._id}>{maincourse.name}<button>E</button><button onClick={() => {deleteMaincourse(maincourse._id)}}><i className="fas fa-trash"/></button></li>)
    const dessert_ = desserts.map((dessert) => <li key={dessert._id}>{dessert.name}<button>E</button><button onClick={() => {deleteDessert(dessert._id)}}><i className="fas fa-trash"/></button></li>)
    return(
        <div className="container">
            <div className="menu-span">
                {/* <span>Constituez le menu de votre mariage: vous pouvez ajouter plusieurs entrées, plats ou desserts...</span> */}
                <span>Constituez le menu de votre mariage</span>
            </div>
            <div className="grid-container-menu">
                <div className="starter forms">
                    <h2>Entrée(s)</h2>
                    <div className="starter-form form">
                        <form onSubmit={submitStarter}>
                            <input
                            type="text"
                            name="name" 
                            value={starter.name} 
                            onChange={handleStarter}/>
                            <button type="submit">OK</button>
                        </form>
                    </div>
                    <ul>{entrée}</ul>
                </div>
                <div className="maincourse forms">
                    <h2>Plat(s)</h2>
                    <div className="maincourse-form form">
                        <form onSubmit={submitMaincourse}>
                            <input
                            type="text"
                            name="name" 
                            value={maincourse.name} 
                            onChange={handleMaincourse}/>
                            <button type="submit">OK</button>
                        </form>

                    </div>
                    <ul>{plat}</ul>
                </div>
                <div className="dessert forms">
                    <h2>Dessert(s)</h2>
                    <div className="maincourse-form form">
                        <form onSubmit={submitDessert}>
                            <input
                            type="text"
                            name="name" 
                            value={dessert.name} 
                            onChange={handleDessert}/>
                            <button type="submit">OK</button>
                        </form>
                    </div>
                    <ul>{dessert_}</ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Menus)