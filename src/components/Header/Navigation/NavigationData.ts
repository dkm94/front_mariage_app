import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WineBarIcon from "@mui/icons-material/WineBar";
import EuroIcon from "@mui/icons-material/Euro";

import { NavigationDataType } from '../../../../types';

export const NavigationData: NavigationDataType[] = [
  {
    idx: 0,
    title: "Tableau de bord",
    icon: DashboardIcon,
    pathname: "/tableau-de-bord",
  },
  {
    idx: 1,
    title: "Invités",
    icon: PeopleIcon,
    pathname: "/invites",
  },
  {
    idx: 2,
    title: "Plan de table",
    icon: ChairAltIcon,
    pathname: "/tables",
  },
  {
    idx: 3,
    title: "Tâches",
    icon: ListAltIcon,
    pathname: "/taches",
  },
  {
    idx: 4,
    title: "Réception",
    icon: WineBarIcon,
    pathname: "/carte",
  },
  {
    idx: 5,
    title: "Dépenses",
    icon: EuroIcon,
    pathname: "/budget",
  },
];
