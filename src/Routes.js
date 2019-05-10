import React from "react";
import App from "./App";
import { Route, Switch } from "react-router-dom";
import UserAssets from "./app/User/components/UserAssets";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/assets" component={UserAssets} />
  </Switch>
);

export default Routes;
