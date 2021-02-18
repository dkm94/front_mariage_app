import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ProtectedRoute from "../src/ProtectedRoutes/Admin";
import Invitation from "../src/Pages/Landing_guest/Home_guest";
import Invités from "../src/Pages/Invités/Invités";
import Tables from "../src/Pages/Tables/Tables";
import Menu from "../src/Pages/Menu/Menu";
import Logout from "./components/Header/Navigation/Log_out"
import Login from "./components/Header/Navigation/Log_in"
import Home from './Pages/Homepage/Home';
import Register from './Pages/Register/Register';
import MenuAdmin from './Pages/MenuAdmin/Menu';
import axios from "axios";
import decode from "jwt-decode";

function App() {

  const token = localStorage.getItem("token");
  let user;
  let role;
  if(token){
    user = decode(token)
    role = user.role
  }

  axios.defaults.baseURL = 'http://localhost:3050';
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

  let navigation;
    if(!token) {
        navigation =  <Logout />
    } else 
        navigation =  <Login />

  return (
    <div className="App">
      <Router>
        {navigation}
          {/* <Switch> */}
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path="/menuAdm" component={MenuAdmin} isAuth={role}/>
            <ProtectedRoute path="/invitation" component={Invitation} isAuth={role}/>
            <ProtectedRoute path="/tables" component={Tables} isAuth={role}/>
            <ProtectedRoute path="/invités" component={Invités} isAuth={role}/>
            <ProtectedRoute path="/menu" component={Menu} isAuth={role}/>
            {/* <Route path="*" component={() => "Contenu introuvable"}/> */}
          {/* </Switch> */}
 
      </Router>
    </div>
  );
}

export default App;
