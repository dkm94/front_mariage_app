import React from "react";
import { withRouter } from "react-router-dom";
import Byguests from "../../components/Invités(affichage)/by_guests/guests";
// import Bygroups from "../../components/Invités(affichage)/by_groups/groups";
import "./Invités.css";

const Guests = () => {
    // const [selectedSection, setSelectedSection] = useState("");

    // const selectSection = (e) => {
    //     setSelectedSection(e.target.value)
    // }

    let section;
    // if (selectedSection ===  "guests"){
    //     section = <Byguests/>
    // } else
    //     section = <Bygroups/>
    section = <Byguests/>
 
    return(
        <div className="guest-container center-x">
            {/* <div className="select-section">
                <label htmlFor="affichage-select">Affichage par:</label>
                <select name="affichage" onChange={selectSection}>
                    <option value="groups">groupes</option>
                    <option value="guests">invités</option>
                </select>
            </div> */}
            {/* <div className="section"> */}
                {section}
            {/* </div> */}
        </div>
    )
}

export default withRouter(Guests)