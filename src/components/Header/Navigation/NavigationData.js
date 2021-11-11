// import { 
//     Dashboard as DashboardIcon,
//     PeopleAlt as PeopleAltIcon,
//     GridOn as GridOnIcon,
//     Restaurant as RestaurantIcon,
//     Euro as EuroIcon,
//     FormatListBulleted as FormatListBulletedIcon
// } from '@material-ui/icons/';
import dashboardIcon from "../../../img/SidebareIcons/dashboard3.png" 
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
        title: "Les invités",
        // icon: <PeopleAltIcon />,
        icon: guestsIcon,
        pathname: "/menu/invites"
    },
    {
        title: "Les tables",
        icon: tablesIcon,
        pathname: "/menu/tables"
    },
    {
        title: "Liste des tâches",
        icon: todoIcon,
        pathname: "/menu/taches"
    },
    {
        title: "Le menu",
        icon: menuIcon,
        pathname: "/menu/carte"
    },
    {
        title: "Les dépenses",
        icon: expensesIcon,
        pathname: "/menu/budget"
    }
]