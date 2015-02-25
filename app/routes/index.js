import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "../components/App";
import IndexRoute from "./IndexRoute";

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={IndexRoute} />
  </Route>
);

export default routes;
