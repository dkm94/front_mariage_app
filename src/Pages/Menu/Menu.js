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


    const entrée = starters.map((starter, i) => <li key={i} data-id={starter._id}>{starter.name}</li>)
    const plat = maincourses.map((maincourse, i) => <li key={i} data-id={maincourse._id}>{maincourse.name}</li>)
    const dessert_ = desserts.map((dessert, i) => <li key={i} data-id={dessert._id}>{dessert.name}</li>)
    return(
        <div>
            <div className="starter">
                <div className="starter-form">
                    <form onSubmit={submitStarter}>
                        <label>Ajouter une entrée</label>
                        <input
                        type="text"
                        name="name" 
                        value={starter.name} 
                        onChange={handleStarter}/>
                        <button type="submit">OK</button>
                    </form>
                </div>
                <h2>Entrée(s)</h2>
                <ul>{entrée}</ul>
            </div>
            <div className="maincourse">
                <div className="maincourse-form">
                    <form onSubmit={submitMaincourse}>
                        <label>Ajouter un plat</label>
                        <input
                        type="text"
                        name="name" 
                        value={maincourse.name} 
                        onChange={handleMaincourse}/>
                        <button type="submit">OK</button>
                    </form>
                </div>
                <h2>Plat(s)</h2>
                <ul>{plat}</ul>
            </div>
            <div className="dessert">
                <div className="maincourse-form">
                    <form onSubmit={submitDessert}>
                        <label>Ajouter un dessert</label>
                        <input
                        type="text"
                        name="name" 
                        value={dessert.name} 
                        onChange={handleDessert}/>
                        <button type="submit">OK</button>
                    </form>
                </div>
                <h2>Dessert(s)</h2>
                <ul>{dessert_}</ul>
            </div>
        </div>
    )
}

export default withRouter(Menus)