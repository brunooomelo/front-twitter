import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/timeline" component={Timeline} />
      </Switch>
    </Router>
  );
}

export default Routes;
