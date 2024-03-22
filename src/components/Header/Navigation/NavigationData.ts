import { NavigationDataType } from '../../../../types';

export const NavigationData: NavigationDataType[] = [
  {
    idx: 0,
    title: "Tableau de bord",
    icon: "space_dashboard",
    pathname: "/tableau-de-bord",
  },
  {
    idx: 1,
    title: "Invités",
    icon: "diversity_3",
    pathname: "/invites",
  },
  {
    idx: 2,
    title: "Plan de table",
    icon: "table_restaurant",
    pathname: "/tables",
  },
  {
    idx: 3,
    title: "Tâches",
    icon: "list",
    pathname: "/taches",
  },
  {
    idx: 4,
    title: "Réception",
    icon: 'local_bar',
    pathname: "/carte",
  },
  {
    idx: 5,
    title: "Dépenses",
    icon: 'euro',
    pathname: "/budget",
  },
];
