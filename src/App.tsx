import "./App.css";

import React, { createContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";

// <------- Components ---------->
// todo: create index file for components
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import { ScrollToTopButton } from "./components/Buttons";
import { Loader } from "./components/Loader/Loader";
import ScrollToTop from "./helpers/ScrollToTop";
import Page from "./components/Page/Page";

// <------- Pages ---------->
// todo: create index file for pages
import { Homepage, TodoPage, GuestsPage, TablesPage, BudgetPage, ReceptionPage, DashboardPage, SettingsPage, NotFoundPage, ResetPage } from "./Pages";

// <------- Types ---------->
import { UserType, RoleType, ScrollButtonType, LoaderType } from "../types/index.js";

// <------- Ctx ---------->
export const UserContext = createContext<UserType>(undefined);
export const AuthenticationContext = createContext<RoleType>(undefined);
export const ScrollButtonContext = createContext<ScrollButtonType>({} as ScrollButtonType);
export const LoaderContext = createContext<LoaderType>({} as LoaderType);

function App() {
  const token: string | null = localStorage.getItem("token");

  let user: UserType;
  let role: RoleType;
  if (token) {
    user = decode(token);
    role = user?.role;
  }

  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  let scrollButton: ScrollButtonType = <ScrollToTopButton />;
  let loader: LoaderType = <Loader />;

  function Home() {
    return <Page title="Accueil" component={Homepage} token={token} />;
  }

  function ResetPassword() {
    return <Page title="Réinitialiser le mot de passe" component={ResetPage} />;
  }

  function Dashboard() {
    return (
      <Page
        title="Tableau de bord"
        userInfos={user}
        auth={role}
        component={DashboardPage}
      />
    );
  }

  function Account() {
    return (
      <Page
        title="Paramètres du compte"
        userInfos={user}
        auth={role}
        component={SettingsPage}
      />
    );
  }

  function Tables() {
    return (
      <Page
        title="Les tables"
        userInfos={user}
        auth={role}
        component={TablesPage}
      />
    );
  }

  function Guests() {
    return (
      <Page
        title="Les invités"
        userInfos={user}
        auth={role}
        component={GuestsPage}
      />
    );
  }

  function Carte() {
    return (
      <Page title="Le repas" userInfos={user} auth={role} component={ReceptionPage} />
    );
  }

  function Budget() {
    return (
      <Page
        title="Les dépenses"
        userInfos={user}
        auth={role}
        component={BudgetPage}
      />
    );
  }

  function TodoList() {
    return (
      <Page
        title="Liste des tâches"
        userInfos={user}
        auth={role}
        component={TodoPage}
      />
    );
  }

  return (
    <div className={token ? "App-home" : "App"}>
      <AuthenticationContext.Provider value={role}>
        <UserContext.Provider value={user}>
          <ScrollButtonContext.Provider value={scrollButton}>
            <LoaderContext.Provider value={loader}>
              <div className={token ? "content" : "content-home"}>
                <ScrollToTop />
                <Switch>
                  <Route exact path="/">
                    {token ? <Redirect to="/tableau-de-bord" /> : Home}
                  </Route>
                  <Route path="/reset-password">
                    {token ? <Redirect to="/menu/mon-compte" /> : ResetPassword}
                  </Route>
                  {/* todo: create dynamic protected routes, update navigation data file */}
                  <ProtectedRoute
                    exact
                    path="/tableau-de-bord"
                    component={Dashboard}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/menu/mon-compte"
                    component={Account}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/menu/tables"
                    component={Tables}
                    isAuth={role}
                    infos={user}
                  />
                  <ProtectedRoute
                    path="/menu/invites"
                    component={Guests}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/menu/carte"
                    component={Carte}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/menu/budget"
                    component={Budget}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/menu/taches"
                    component={TodoList}
                    isAuth={role}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </LoaderContext.Provider>
          </ScrollButtonContext.Provider>
        </UserContext.Provider>
      </AuthenticationContext.Provider>
      <Footer token={token} />
    </div>
  );
}

export default App;
