import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WineBarIcon from "@mui/icons-material/WineBar";
import EuroIcon from "@mui/icons-material/Euro";
// import dashboardIcon from "../../../img/SidebareIcons/dashboard.png";
// import guestsIcon from "../../../img/SidebareIcons/guests.png";
// import tablesIcon from "../../../img/SidebareIcons/tables.png";
// import todoIcon from "../../../img/SidebareIcons/todo.png";
// import menuIcon from "../../../img/SidebareIcons/menu.png";
// import expensesIcon from "../../../img/SidebareIcons/money.png";

export const NavigationData = [
  {
    title: "Tableau de bord",
    icon: <DashboardIcon />,
    pathname: "/tableau-de-bord",
  },
  {
    title: "Invités",
    icon: <PeopleIcon />,
    pathname: "/menu/invites",
  },
  {
    title: "Plan de table",
    icon: <ChairAltIcon />,
    pathname: "/menu/tables",
  },
  {
    title: "Tâches",
    icon: <ListAltIcon />,
    pathname: "/menu/taches",
  },
  {
    title: "Réception",
    icon: <WineBarIcon />,
    pathname: "/menu/carte",
  },
  {
    title: "Dépenses",
    icon: <EuroIcon />,
    pathname: "/menu/budget",
  },
];
