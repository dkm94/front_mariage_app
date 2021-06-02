import React from 'react';
import { Link } from "react-router-dom";
import "./Dashboard_card.css";

const Card = (props) => {
    
    const {responsive, title, number, strip, path, detailedMenu, entrées, plats, desserts} = props;

    return(
        <div className={`${responsive} card-component`} >
            <div className="card">
                <div className="row g-0">
                    <div className="col-2 card-strip" style={{ backgroundColor: strip}} />
                    <div className="col-10 card-pd">
                        <div className="card-body">
                            {detailedMenu ? 
                            <>
                                <h5 className="card-title">{title}</h5>
                                <div className="menu-elements">
                                    <div>
                                        {entrées === 1 || 0 ? <span>entrée</span> : <span>entrées</span>}
                                        <span className="element___data-size">{entrées}</span>
                                    </div>
                                    <div>
                                        {plats === 1 || 0 ? <span>plat</span> : <span>plats</span>}
                                        <span className="element___data-size">{plats}</span>
                                    </div>
                                    <div>
                                        {desserts === 1 || 0 ? <span>dessert</span> : <span>desserts</span>}
                                        <span className="element___data-size">{desserts}</span>
                                    </div>
                                </div>
                                <Link to={path} replace>Voir détails</Link>
                            </> : 
                            <>
                                <h5 className="card-title">{title}</h5>
                                <span>{number}</span>
                                <Link to={path} replace>Voir détails</Link>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;