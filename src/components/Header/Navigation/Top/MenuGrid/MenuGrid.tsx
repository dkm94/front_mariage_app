import "./MenuGrid.css";

import React, { HTMLAttributes, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { NavigationData } from '../../NavigationData';

interface GridItemProps extends HTMLAttributes<HTMLUListElement> {
    idx: number;
    title: string;
    color: string;
    path?: string;
    icon: string;
    mariageID?: string;
    userId?: string;
}
interface MenuGridProps extends HTMLAttributes<HTMLDataListElement> {
    mariageID: string;
    userId: string;
    showMenu: (show: boolean) => void;
}
export const GridItem = (props: GridItemProps) => {
    const { idx, title, color, path, icon, mariageID, userId } = props;

    const win: Window = window;
    const logout = (): void => { // TODO: create logout function (back)
        console.log("déconnexion...");
        localStorage.removeItem("token");
        win.location = "/";
      };

    if(title === "Déconnexion"){
        return (
            <li key={idx} style={{ backgroundColor: color }} className={`menu-grid-item grid-item-${idx}`}>
                <button     
                type="submit" 
                onClick={logout} 
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor: "unset",
                    gap: "8px"}} 
                >
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "grey", fontSize: "2rem" }}>{icon}</span>
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
                    justifyContent: "center",
                    gap: "8px"}} 
                >
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "#FFF", fontSize: "2rem" }}>{icon}</span>
                    <span style={{ color: "#534a43", backgroundColor: "#FFF", padding: "1px 15px", textAlign: "center"}}>{title}</span>
                </NavLink>
            </li>
        )
    }  else {
        return (
            <li key={idx} style={{ backgroundColor: color }} className={`menu-grid-item grid-item-${idx}`}>
                <NavLink to={`/mariage/${mariageID}${path}`} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px"}}> 
                    <span className="material-symbols-outlined" style={{ textAlign: "center", color: "#FFF", fontSize: "2rem" }}>{icon}</span>
                    <span style={{ color: "#534a43", backgroundColor: "#FFF", padding: "1px 15px", borderRadius: "3px", textAlign: "center", width: "max-content"}}>{title === "Tableau de bord" ? "Accueil" : title}</span>
                </NavLink>
            </li>
        )
    }
    
}

const MenuGrid = (props: MenuGridProps) => {
    const { mariageID, userId, showMenu } = props;
    const { pathname } = useLocation();

    useEffect(() => {
        showMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
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
                />
            )
        })}
        <GridItem 
        idx={6} 
        title={"Paramètres"} 
        color={"#DDDFE0"} 
        icon={"settings"} 
        userId={userId} 
        />
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