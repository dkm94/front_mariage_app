import "./App.css";

import React, { createContext, useEffect, useState } from "react";
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
import { 
  Homepage, 
  TodoPage, 
  GuestsPage, 
  TablesPage, 
  BudgetPage, 
  ReceptionPage, 
  DashboardPage, 
  SettingsPage, 
  NotFoundPage, 
  ResetPage 
} from "./Pages";

// <------- Types ---------->
import { UserType, RoleType, ScrollButtonType, LoaderType } from "../types/index.js";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import { CurrentUserContext } from "./ctx/userCtx";

// <------- Ctx ---------->
// export const UserContext = createContext<UserType>({} as UserType);
export const AuthenticationContext = createContext<RoleType>(undefined);
export const ScrollButtonContext = createContext<ScrollButtonType>({} as ScrollButtonType);
export const LoaderContext = createContext<LoaderType>({} as LoaderType);

function App() {
  const token: string | null = localStorage.getItem("token");

  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [role, setRole] = useState<RoleType | undefined>(undefined);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      const decodedUser = decode(token);
      setUser(decodedUser as UserType);
      setRole((decodedUser as UserType)?.role);
    }
  }, []);

  axios.defaults.baseURL = "https://my-wedding-backend.onrender.com/";
  axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  let scrollButton: ScrollButtonType = <ScrollToTopButton />;
  let loader: LoaderType = <Loader />;

  const Home = () => <Page title="Accueil" component={Homepage} token={token} />
  const ResetPassword = () => <Page title="Réinitialiser le mot de passe" component={ResetPage} token={token} />

  const Dashboard = () => user?.id ? <Page title="Tableau de bord" userInfos={user} auth={role} component={DashboardPage} token={token} /> : null;
  const Account = () => user?.id ? <Page title="Paramètres du compte" userInfos={user} auth={role} component={SettingsPage} /> : null;
  const Tables = () => user?.id ? <Page title="Les tables" userInfos={user} auth={role} component={TablesPage} /> : null;
  const Guests = () => user?.id ? <Page title="Les invités" userInfos={user} auth={role} component={GuestsPage} /> : null;
  const Carte = () => user?.id ? <Page title="Le repas" userInfos={user} auth={role} component={ReceptionPage} /> : null;
  const Budget = () => user?.id ? <Page title="Les dépenses" userInfos={user} auth={role} component={BudgetPage} /> : null;
  const TodoList = () => user?.id ? <Page title="Liste des tâches" userInfos={user} auth={role} component={TodoPage} /> : null;

  return (
    <div className={token ? "App-home" : "App"}>
      <AuthenticationContext.Provider value={role}>
        <CurrentUserContext.Provider value={user}>
          <ScrollButtonContext.Provider value={scrollButton}>
            <LoaderContext.Provider value={loader}>
              <div className={token ? "content" : "content-home"}>
                <ScrollToTop />
                <Switch>
                  <Route exact path="/">
                    {token && user?.id ? <Redirect to={`/mariage/${user?.id}/tableau-de-bord`} /> : Home}
                  </Route>
                  <Route path="/login" component={Login}>
                    {token && user?.id ? <Redirect to={`/mariage/${user?.id}/tableau-de-bord`} /> : Home}
                  </Route>
                  <Route path="/register" component={Register}>
                    {token && user?.id ? <Redirect to={`/mariage/${user?.id}/tableau-de-bord`} /> : Home}
                  </Route>
                  <Route path="/reset-password">
                    {token ? <Redirect to="/compte/:id/configuration" /> : ResetPassword}
                  </Route>
                  {/* todo: create dynamic protected routes, update navigation data file */}
                  <ProtectedRoute
                    // exact
                    path="/mariage/:id/tableau-de-bord"
                    component={Dashboard}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/compte/:id/configuration"
                    component={Account}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/mariage/:id/tables"
                    component={Tables}
                    isAuth={role}
                    infos={user}
                  />
                  <ProtectedRoute
                    path="/mariage/:id/invites"
                    component={Guests}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/mariage/:id/carte"
                    component={Carte}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/mariage/:id/budget"
                    component={Budget}
                    isAuth={role}
                  />
                  <ProtectedRoute
                    path="/mariage/:id/taches"
                    component={TodoList}
                    isAuth={role}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </LoaderContext.Provider>
          </ScrollButtonContext.Provider>
        </CurrentUserContext.Provider>
      </AuthenticationContext.Provider>
      <Footer token={token} />
    </div>
  );
}

export default App;
