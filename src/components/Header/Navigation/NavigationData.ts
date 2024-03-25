import { NavigationDataType } from '../../../../types';

export const NavigationData: NavigationDataType[] = [
  {
    idx: 0,
    title: "Tableau de bord",
    icon: "space_dashboard",
    pathname: "/tableau-de-bord",
    color: "#A39E9B",
  },
  {
    idx: 1,
    title: "Invités",
    icon: "diversity_3",
    pathname: "/invites",
    color: "#534A43",
  },
  {
    idx: 2,
    title: "Plan de table",
    icon: "table_restaurant",
    pathname: "/tables",
    color: "#B9B5B2",
  },
  {
    idx: 3,
    title: "Tâches",
    icon: "list",
    pathname: "/taches",
    color: "#97877D",
  },
  {
    idx: 4,
    title: "Réception",
    icon: 'local_bar',
    pathname: "/carte",
    color: "#D2D3D1",
  },
  {
    idx: 5,
    title: "Dépenses",
    icon: 'euro',
    pathname: "/budget",
    color: "#BAADA4",
  },
];
