import React from 'react';
import { Route, BrowserRouter as Router } from  'react-router-dom';
import { Switch } from "react-router-dom";
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
