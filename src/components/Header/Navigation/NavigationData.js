import { Dashboard as DashboardIcon,
    PeopleAlt as PeopleAltIcon,
    GridOn as GridOnIcon,
    Restaurant as RestaurantIcon,
    Euro as EuroIcon,
    FormatListBulleted as FormatListBulletedIcon
} from '@material-ui/icons/';

export const NavigationData = [
    {
        title: "Tableau de bord",
        icon: <DashboardIcon />,
        pathname: "/tableau-de-bord"
    },
    {
        title: "Les invités",
        icon: <PeopleAltIcon />,
        pathname: "/menu/invites"
    },
    {
        title: "Les tables",
        icon: <GridOnIcon />,
        pathname: "/menu/tables"
    },
    {
        title: "Liste des tâches",
        icon: <FormatListBulletedIcon />,
        pathname: "/menu/taches"
    },
    {
        title: "Le menu",
        icon: <RestaurantIcon />,
        pathname: "/menu/carte"
    },
    {
        title: "Les dépenses",
        icon: <EuroIcon />,
        pathname: "/menu/budget"
    }
]