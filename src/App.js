import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';

// <------- Setup App ---------->
import ProtectedRoute from "../src/ProtectedRoutes/Admin";
import useDocumentTitle from "./setupTitle";

// <------- Components ---------->
import LoggedOutNavigation from "./components/Header/Navigation/Log_out"
import LoggedInNavigation from "./components/Header/Navigation/Sidebar"
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
// import Invitation from "../src/Pages/Landing_guest/Home_guest";
// import Menu from "../src/Pages/MenuAdmin/Menu";

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

  axios.defaults.baseURL = 'https://backend-mywedding-app.herokuapp.com';
  // axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

  let navigation;
    if(!token) {
        navigation =  <LoggedOutNavigation />
    } else 
        navigation =  <LoggedInNavigation userInfos={user}/>

  let scrollButton = <ScrollButton />

  function Page({ title: titre, component: Component, isAuth:role, userInfos:info, scroll: scrollBtn }) {
    const titlePrefix = "My Wedding | "
    useDocumentTitle(`${titlePrefix}${titre}`)
    return <Component userRole={role} infos={info} button={scrollBtn}/>;
  }
  
  function Home() {
    return <Page title="Accueil" component={Homepage}/>
  }
  
  function Login() {
    return <Page title="Connexion" component={Connexion} />
  }
  
  function Register() {
    return <Page title="Créer un compte" component={NouvelUtilisateur} />
  }

  function Dashboard() {
    return <Page title="Tableau de bord" component={TableauDeBord} />
  }
  
  function Account() {
    return <Page title="Paramètres du compte" component={CompteUtilisateur} />
  }
  
  function Tables() {
    return <Page title="Les tables" component={LesTables} />
  }
  
  function Guests() {
    return <Page title="Les invités" component={LesInvités} />
  }
  
  function Carte() {
    return <Page title="Le repas" component={LaCarte} />
  }
  
  function Budget() {
    return <Page title="Les dépenses" component={LesDépenses} />
  }

  function TodoList() {
    return <Page title="Liste des tâches" component={Todo} />
  }


  return (
    <div className="App">
      <AuthenticationContext.Provider value={role}>
        <UserContext.Provider value={user}>
          <ScrollButtonContext.Provider value={scrollButton}>
            {/* <Router> */}
              <div className="content">
              {/* {navigation} */}
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <ProtectedRoute exact path="/tableau-de-bord" component={Dashboard} isAuth={role}/>
                  <ProtectedRoute path="/menu/mon-compte" component={Account} isAuth={role}/>
                  {/* <ProtectedRoute path="/menu/invitation/:id" component={Invitation} isAuth={role} userInfos={user} scroll={scrollButton}/> */}
                  <ProtectedRoute path="/menu/tables" component={Tables} isAuth={role}/>
                  <ProtectedRoute path="/menu/invites" component={Guests} isAuth={role}/>
                  <ProtectedRoute path="/menu/carte" component={Carte} isAuth={role}/>
                  <ProtectedRoute path="/menu/budget" component={Budget} isAuth={role}/>
                  <ProtectedRoute path="/menu/taches" component={TodoList} isAuth={role}/>
                  {/* <Route path="*" component={() => "Contenu introuvable"}/> */}
                </Switch>
              </div>
              <div>
                {/* <Footer className="footer-component"/> */}
              </div>
            
            {/* </Router> */}
          </ScrollButtonContext.Provider>
        </UserContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
