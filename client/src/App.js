import React from "react";
import {Route, Switch } from 'react-router-dom';
import Home from './Home'
import CreateNewAuction from './CreateNewAuction'
import RunningAuctions from './RunningAuctions'
import PlaceBid from './PlaceBid'
import Team from './Team'
import "./App.css";

function App() {
  return (
    <div className = "App">
        <Switch>
          <Route path="/createAuction" component = {CreateNewAuction}/>
          <Route path="/runningAuctions" component = {RunningAuctions}/>
          <Route path="/placeBid" component = {PlaceBid}/>
          <Route path="/team" component = {Team}/>
          <Route path="/" component = {Home}/>
        </Switch>
    </div>
  );
}

export default App;
