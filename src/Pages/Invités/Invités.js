import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import Button from "../../LargeButton/LargeButton";
import { ScrollButtonContext } from "../../App";
import AddForm from "../../components/Invités(affichage)/by_guests/Components/Form/AddGuest";
import GuestList from "../../components/Invités(affichage)/by_guests/Components/Guests/Guests";
import SearchBar from "../../components/Invités(affichage)/by_guests/Components/SearchBar/SearchBar";
import "../../components/Invités(affichage)/by_guests/guests.css";
import "./Invités.css";
import axios from "axios";

const Byguests = ({ userInfos }) => {

    const mariageID = userInfos.mariageID;
    const firstPerson = userInfos.firstPerson;
    const secondPerson = userInfos.secondPerson;
    const scrollBtn = useContext(ScrollButtonContext)

    const [guests, setGuests] = useState([]);
    const [editPicture, seteditPicture] = useState(null)
    const [file, setFile] = useState(null)
    const [searchValue, setSearchValue] = useState("");
    const [user, setUser] = useState({});
    const [appear, setAppear] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            axios.get("/api/admin/guests/")
            .then(result => {
                setAppear(true)
                setGuests(result.data)
            })
            .catch(err => err.json("Failed to load the ressource"))
        }
        fetchData();
    }, [user]) 

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const addGuest = newGuest => {
        setUser(newGuest)
        setGuests([...guests, newGuest])
    }

    const editGuest = (updatedGuest) => {
        const updatedGueslist = [...guests].map((guest) => {
            if(guest._id === updatedGuest.id) {
                guest.name = updatedGuest.name
            }
            return guest
        })
        setUser(updatedGuest)
        setGuests(updatedGueslist);
    }

    const deleteGuest = (id) => {
        axios.delete(`/api/admin/guests/delete/${id}`)
            .then(result => {
                if(result.data != null) {
                    setGuests(guests.filter(guest => guest._id !== id))
                }
            })
            .catch((err) => {
                console.log(err)})
    }

    const handleFile = file => {
        setFile(file)
    }

    const uploadPicture = (id) => {
        let formData = new FormData();
        formData.append('media', file)
        axios.post(`/api/admin/guests/edit/${id}`, formData)
            .then(result => {
                if(result.data != null) {
                    setFile(null)
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)})
    }
    
    const button_wrapper_style = {
        position: 'relative',
        zIndex: 1
    }

    return(
        <div className="byguests page-component">
            <div className="guest-container" style={button_wrapper_style}>
            {scrollBtn}
                <div className="page-location"><div><Link to={"/"} >Dashboard</Link>{'>'} Invités</div></div>
                <div className="guests___bgimage"><div className="component-title"><h1>Les invités</h1></div></div>
                <div className="titles mb-3">
                    <h2>Souhaitez-vous ajouter de nouveaux invités ?</h2>
                </div>
                <Container style={{ padding: "2rem 4rem"}} fluid>
                    <Row>
                        <Col xs={12} sm={10} md={6} className="guest-form">
                            <AddForm addGuest={addGuest} />
                        </Col>
                        <Col xs={12} sm={10} md={6} className="searchbar">
                            <SearchBar 
                            className="search__input"
                            type="text"
                            placeholder="Rechercher un invité"
                            name="searchbar"
                            value={searchValue}
                            onChange={handleSearch}
                            />
                        </Col>
                    </Row>
                </Container>
                <div className="guests___list">
                    <div className="byguests___block">
                        <GuestList 
                        guests={guests}
                        setGuests={setGuests}
                        deleteGuest={deleteGuest}
                        updateGuest={editGuest}
                        editPicture={editPicture}
                        seteditPicture={seteditPicture}
                        upload={uploadPicture}
                        handleFile={handleFile}
                        searchValue={searchValue}
                        mariageID={mariageID}
                        appear={appear}
                        firstPerson={firstPerson}
                        secondPerson={secondPerson}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Byguests);
