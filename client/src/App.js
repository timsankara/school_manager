import React, { Component } from "react";
import { Switch, Route, } from "react-router-dom";
import Home from './pages/Home'
import NavBar from './components/NavBar'

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
