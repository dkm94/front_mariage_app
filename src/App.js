import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import LoggedOutNavigation from "./components/Header/Navigation/Log_out"
import LoggedInNavigation from "./components/Header/Navigation/Log_in"
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "../src/ProtectedRoutes/Admin";
// import Menu from "../src/Pages/MenuAdmin/Menu";
import Dashboard from "../src/Pages/Dashboard/Dashboard";
import Account from "../src/Pages/Mon_Compte/Mon_compte";
import Home from './Pages/Homepage/Home';
import Register from './Pages/Auth/Register/Register';
import Login from './Pages/Auth/Login/Login';
// import Invitation from "../src/Pages/Landing_guest/Home_guest";
import Invités from "../src/Pages/Invités/Invités";
import Tables from "../src/Pages/Tables/Tables";
import Carte from "../src/Pages/Menu/Menu";
import Budget from "../src/Pages/Budget/Budget.js";
import ScrollButton from "../src/components/ScrollToTop/ScrollToTop";

import axios from "axios";
import decode from "jwt-decode";

function App() {

  const token = localStorage.getItem("token");

  let user;
  let role;
  if(token){
    user = decode(token)
    // console.log(user)
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


  return (
    <div className="App">
      <Router>
        {navigation}
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute exact path="/tableau-de-bord" component={Dashboard} isAuth={role} userInfos={user} scroll={scrollButton}/>
            <ProtectedRoute path="/menu/mon-compte" component={Account} isAuth={role} userInfos={user} scroll={scrollButton}/>
            {/* <ProtectedRoute path="/menu/invitation/:id" component={Invitation} isAuth={role} userInfos={user} scroll={scrollButton}/> */}
            <ProtectedRoute path="/menu/tables" component={Tables} isAuth={role} scroll={scrollButton}/>
            <ProtectedRoute path="/menu/invités" component={Invités} isAuth={role} scroll={scrollButton}/>
            <ProtectedRoute path="/menu/carte" component={Carte} isAuth={role} scroll={scrollButton}/>
            <ProtectedRoute path="/menu/budget" component={Budget} isAuth={role} userInfos={user} scroll={scrollButton}/>
            {/* <Route path="*" component={() => "Contenu introuvable"}/> */}
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
