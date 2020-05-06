import React from 'react';
import { Route, BrowserRouter as Router } from  'react-router-dom';
import { Switch } from "react-router-dom";
import Home from './components/Home';
import MenuAdm from './components/MenuAdm';
import EspacePersonnalisé from './components/EspacePersonnalisé';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/menuAdm" component={MenuAdm}/>
          <Route path="/espacePerso" component={EspacePersonnalisé}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
