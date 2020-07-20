import React from 'react';
import { Route, BrowserRouter as Router } from  'react-router-dom';
import { Switch } from "react-router-dom";
import Home from './components/Home';
import LoginAdmin from './components/Login';
import MenuAdm from './components/MenuAdm';
import EspacePersonnalisé from './components/EspacePersonnalisé';
import Groupes from './components/Groupes';
import Tables from './components/Tables';
import Menus from './components/Menus';
import Cake from './components/Gâteau';
import Profil from './components/Profil';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/loginAdmin" component={LoginAdmin}/>
          <Route path="/menuAdm" component={MenuAdm}/>
          <Route path="/espacePerso" component={EspacePersonnalisé}/>
          <Route path="/groupes" component={Groupes}/>
          <Route path="/tables" component={Tables}/>
          <Route path="/menus" component={Menus}/>
          <Route path="/gâteau" component={Cake}/>
          <Route path="/profil" component ={Profil}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
