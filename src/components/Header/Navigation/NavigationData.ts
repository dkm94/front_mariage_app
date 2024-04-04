import { NavigationDataType } from '../../../../types';

export const NavigationData: NavigationDataType[] = [
  {
    idx: 0,
    title: "Tableau de bord",
    icon: "space_dashboard",
    pathname: "/tableau-de-bord",
    color: "#97877D",
  },
  {
    idx: 1,
    title: "Invités",
    icon: "diversity_3",
    pathname: "/invites",
    color: "rgb(169 151 140)",
  },
  {
    idx: 2,
    title: "Plan de table",
    icon: "table_restaurant",
    pathname: "/tables",
    color: "rgb(187 167 155)",
  },
  {
    idx: 3,
    title: "Tâches",
    icon: "list",
    pathname: "/taches",
    color: "rgb(201 180 167)",
  },
  {
    idx: 4,
    title: "Réception",
    icon: 'local_bar',
    pathname: "/carte",
    color: "rgb(210 189 176)",
  },
  {
    idx: 5,
    title: "Dépenses",
    icon: 'euro',
    pathname: "/budget",
    color: "rgb(231 209 195)",
  },
];
