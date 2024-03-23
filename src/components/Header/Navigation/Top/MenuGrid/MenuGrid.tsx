import "./MenuGrid.css";

import React, { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { NavigationData } from '../../NavigationData';

interface GridItemProps extends HTMLAttributes<HTMLUListElement> {
    idx: number;
    title: string;
    color: string;
    path?: string;
    icon: string;
    mariageID?: string;
    userId?: string;
    logout?: () => void;
}
interface MenuGridProps extends HTMLAttributes<HTMLDataListElement> {
    mariageID: string;
    userId: string;
    logout: () => void;
}
export const GridItem = (props: GridItemProps) => {
    const { idx, title, color, path, icon, mariageID, userId, logout } = props;
    if(title === "Déconnexion"){
        return (
            <li key={idx} style={{ backgroundColor: color }} className={`menu-grid-item grid-item-${idx}`}>
                <button 
                type="submit" 
                onClick={() => logout && logout()} 
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor: "unset"}} 
                >
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "grey", fontSize: "3rem" }}>{icon}</span>
                    <span>Déconnexion</span>
                </button>
            </li>
        )
    } else if(title === "Paramètres"){
        return (
            <li key={idx} style={{ backgroundColor: color }} className={`menu-grid-item grid-item-${idx}`}>
                <NavLink 
                to={`/compte/${userId}/configuration`} 
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center"}} 
                >
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "#FFF", fontSize: "3rem" }}>{icon}</span>
                    <span style={{ color: "#FFF"}}>{title}</span>
                </NavLink>
            </li>
        )
    }  else {
        return (
            <li key={idx} style={{ backgroundColor: color }} className={`menu-grid-item grid-item-${idx}`}>
                <NavLink to={`/mariage/${mariageID}${path}`} style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}> 
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "#FFF", fontSize: "3rem" }}>{icon}</span>
                    <span style={{ color: "#FFF"}}>{title}</span>
                </NavLink>
            </li>
        )
    }
    
}

const MenuGrid = (props: MenuGridProps) => {
    const { mariageID, userId, logout} = props;
  return (
    <ul className='menu-grid'>
        {NavigationData.map((item, i) => {
            return (
                <GridItem 
                key={item.idx} 
                idx={item.idx} 
                title={item.title} 
                color={item.color} 
                path={item.pathname} 
                icon={item.icon}
                mariageID={mariageID} 
                logout={logout}
                />
            )
        })}
        <GridItem 
        idx={6} 
        title={"Paramètres"} 
        color={"#DDDFE0"} 
        icon={"settings"} 
        userId={userId} 
        logout={logout} />
        <GridItem 
        idx={7} 
        title={"Déconnexion"} 
        color={"inherit"} 
        icon={"waving_hand"} 
        mariageID={mariageID} 
        />
        </ul>
  )
}

export default MenuGrid