import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Liked from "./components/Liked";

export default function App() {
  return (
    <div className="App">
      <div style={{height:40, backgroundColor: 'black'}}>
        <NavLink activeClassName="active" exact to="/" style={{marginRight:16}}>
          HOME
        </NavLink>
        <NavLink activeClassName="active"  to="/liked">
        LIKED
        </NavLink>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/liked" component={Liked} />
      </Switch>
    </div>
  );
}