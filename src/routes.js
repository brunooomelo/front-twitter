import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Timeline from "./pages/Timeline";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Login} />
        <Route path="/timeline" component={Timeline} />
      </Switch>
    </Router>
  );
}

export default Routes;
