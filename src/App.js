import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AdminRoute from "../src/ProtectedRoutes/Admin";
import Tables from "../src/Pages/Tables/Tables";
// import Navigation from "./components/Header/Header";
import Logout from "../src/components/Navigation/Log_out"
import Login from "../src/components/Navigation/Log_in"
import Home from './components/Home/Home';
// import HomePage from "../src/Admin/Pages/Home";
import Register from './components/Register/Register';
import MenuAdmin from './components/Menu_Adm/Menu';
import axios from "axios";
import decode from "jwt-decode";
axios.defaults.baseURL = 'http://localhost:3050';

function App() {

  const token = localStorage.getItem("token");
  let user;
  let role;
  if(token){
    user = decode(token)
    console.log(user)
    role = user.role
    console.log(role);
  }

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
            <AdminRoute path="/menuAdm" component={MenuAdmin} isAuth={role}/>
            <AdminRoute path="/tables" component={Tables} isAuth={role}/>
            <Route path="*" component={() => "Contenu introuvable"}/>
          {/* </Switch> */}
 
      </Router>
    </div>
  );
}

export default App;
