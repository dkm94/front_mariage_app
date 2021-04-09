import React, { useState, useEffect } from "react";
import Button from "../../LargeButton/LargeButton";
import axios from "axios";
import "./groups.css";

const Bygroups = () => {
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState({name: '', email: ''})

    useEffect(() => {
        const fetchData = async () => {
            // console.log("coucou")
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: 'Bearer '+ token }
              };
            const result = await axios.get("/api/admin/groups/", config)
            setGroups(result.data)
            // console.log("updated")
        }
        fetchData();
        // console.log("mounted")
    }, [])

    const handleChange = (e) => {
        const {value, name} = e.target;
        setNewGroup(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (name, mail) => {
        // alert("submitted!")
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
            };
        axios.post("/api/admin/groups/add", {name: name, email: mail}, config)
            .then((res) => {
                console.log(res.data)
                if(res.data != null){
                    const updatedGroupList = [newGroup, ...groups]
                    setGroups(updatedGroupList)
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const deleteGroup = (id) => {
        // alert("submitted !")
        console.log(id)
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: 'Bearer '+ token }
        };
        axios.delete(`/api/admin/groups/delete/${id}`, config)
            .then(result => {
                console.log(result.data)
                if(result.data != null) {
                    // alert("Groupe supprimé.");
                    setGroups(groups.filter(group => group._id !== id))
                }
            })
    }

    return(
        <div className="bygroups">
            {/* <h1>Affichage par groupes</h1> */}
            <div className="guest-form">
                <form onSubmit={() => handleSubmit(newGroup.name, newGroup.email)}>
                    <label>Créer un nouveau groupe</label><br />
                    <input
                    type="text"
                    name="name" 
                    value={newGroup.name}
                    placeholder="Nom du groupe" 
                    onChange={handleChange}/>
                    <input
                    type="email"
                    name="email" 
                    value={newGroup.email}
                    placeholder="Email associé au groupe"
                    onChange={handleChange}/>
                    <button type="submit">OK</button>
                </form>
            </div>
            <div className="get-guests">
                {groups.map(({name, _id, guestID}, i) => {
                return <div key={i} className="div-group">
                    <div className="group-name">
                        <span>{name}</span>
                    </div>
                
                    {guestID.map((guest, j) => {
                        return <div key={j} className="groupGuests"><p data-id={guest._id}>{guest.name}</p><button>v</button><button>x</button></div>
                    })}
                    <div className="del-group">
                        <Button onClick={() => {deleteGroup(_id)}} title="Supprimer le groupe"/>
                    </div>
            </div>
            })}
            </div>
            
        </div>
    )
}

export default Bygroups;