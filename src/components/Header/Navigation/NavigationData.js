// import { 
//     Dashboard as DashboardIcon,
//     PeopleAlt as PeopleAltIcon,
//     GridOn as GridOnIcon,
//     Restaurant as RestaurantIcon,
//     Euro as EuroIcon,
//     FormatListBulleted as FormatListBulletedIcon
// } from '@mui/icons-material/';
import dashboardIcon from "../../../img/SidebareIcons/dashboard.png" 
import guestsIcon from "../../../img/SidebareIcons/guests.png" 
import tablesIcon from "../../../img/SidebareIcons/tables.png" 
import todoIcon from "../../../img/SidebareIcons/todo.png" 
import menuIcon from "../../../img/SidebareIcons/menu.png" 
import expensesIcon from "../../../img/SidebareIcons/money.png" 

export const NavigationData = [
    {
        title: "Tableau de bord",
        icon: dashboardIcon,
        pathname: "/tableau-de-bord"
    },
    {
        title: "invités",
        // icon: <PeopleAltIcon />,
        icon: guestsIcon,
        pathname: "/menu/invites"
    },
    {
        title: "plan de table",
        icon: tablesIcon,
        pathname: "/menu/tables"
    },
    {
        title: "tâches",
        icon: todoIcon,
        pathname: "/menu/taches"
    },
    {
        title: "réception",
        icon: menuIcon,
        pathname: "/menu/carte"
    },
    {
        title: "dépenses",
        icon: expensesIcon,
        pathname: "/menu/budget"
    }
]