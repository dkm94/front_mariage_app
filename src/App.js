import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

// <------- Setup App ---------->
import ProtectedRoute from "../src/ProtectedRoutes/Admin";
import useDocumentTitle from "./setupTitle";

// <------- Components ---------->
import Footer from "./components/Footer/Footer";
import ScrollButton from "../src/components/ScrollToTop/ScrollToTop";

// <------- Pages ---------->
import Homepage from './Pages/Homepage/Home';
import NouvelUtilisateur from './Pages/Auth/Register/Register';
import Connexion from './Pages/Auth/Login/Login';
import TableauDeBord from "../src/Pages/Dashboard/Dashboard";
import CompteUtilisateur from "../src/Pages/Mon_Compte/Mon_compte";
import LesInvités from "../src/Pages/Invités/Invités";
import LesTables from "../src/Pages/Tables/Tables";
import LaCarte from "../src/Pages/Menu/Menu";
import LesDépenses from "../src/Pages/Budget/Budget.js";
import Todo from "../src/Pages/Todo/Todo";

// <------- Packages ---------->
import axios from "axios";
import decode from "jwt-decode";

// <------- Props ---------->
export const UserContext = React.createContext()
export const AuthenticationContext = React.createContext()
export const ScrollButtonContext = React.createContext()

function App() {

  const token = localStorage.getItem("token");

  let user;
  let role;
  if(token){
    user = decode(token)
    role = user.role
  }
  console.log(user)
  axios.defaults.baseURL = 'https://backend-mywedding-app.herokuapp.com';
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

  let scrollButton = <ScrollButton />

  function Page({ title: titre, component: Component, auth:userRole, userInfos:infos }) {
    const titlePrefix = "My Wedding | "
    useDocumentTitle(`${titlePrefix}${titre}`)
    return <Component page={titre} userInfos={infos} userRole={userRole} token={token} />;
  }
  
  function Home() {
    return <Page title="Accueil" component={Homepage} token={token}/>
  }
  
  function Login() {
    return <Page title="Connexion" component={Connexion} />
  }
  
  function Register() {
    return <Page title="Créer un compte" component={NouvelUtilisateur} />
  }

  function Dashboard() {
    return <Page title="Tableau de bord" userInfos={user} auth={role} component={TableauDeBord} />
  }
  
  function Account() {
    return <Page title="Paramètres du compte" userInfos={user} auth={role} component={CompteUtilisateur} />
  }
  
  function Tables() {
    return <Page title="Les tables" userInfos={user} auth={role} component={LesTables} />
  }
  
  function Guests() {
    return <Page title="Les invités" userInfos={user} auth={role} component={LesInvités} />
  }
  
  function Carte() {
    return <Page title="Le repas" userInfos={user} auth={role} component={LaCarte} />
  }
  
  function Budget() {
    return <Page title="Les dépenses" userInfos={user} auth={role} component={LesDépenses} />
  }

  function TodoList() {
    return <Page title="Liste des tâches" userInfos={user} auth={role} component={Todo} />
  }


  return (
    <div className={token ? "App-home" : "App"}>
      <AuthenticationContext.Provider value={role}>
        <UserContext.Provider value={user}>
          <ScrollButtonContext.Provider value={scrollButton}>
              <div className={token ? "content" : "content-home"}>
                <Switch>
                  <Route exact path="/">
                    {token ? <Redirect to="/tableau-de-bord" /> : Home}
                  </Route>
                  <Route path="/login">
                    {token ? <Redirect to="/menu/mon-compte" /> : Login }
                  </Route>
                  <Route path="/register">
                    {token ? <Redirect to="/menu/mon-compte" /> : Register }
                  </Route>
                  <ProtectedRoute exact path="/tableau-de-bord" component={Dashboard} isAuth={role}/>
                  <ProtectedRoute path="/menu/mon-compte" component={Account} isAuth={role}/>
                  <ProtectedRoute path="/menu/tables" component={Tables} isAuth={role} infos={user} />
                  <ProtectedRoute path="/menu/invites" component={Guests} isAuth={role}/>
                  <ProtectedRoute path="/menu/carte" component={Carte} isAuth={role}/>
                  <ProtectedRoute path="/menu/budget" component={Budget} isAuth={role}/>
                  <ProtectedRoute path="/menu/taches" component={TodoList} isAuth={role}/>
                  {/* <Route path="*" component={() => "Contenu introuvable"}/> */}
                </Switch>
              </div>
              <div>
              </div>
          </ScrollButtonContext.Provider>
        </UserContext.Provider>
      </AuthenticationContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
