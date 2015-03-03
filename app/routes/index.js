import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "../components/App";
import IndexRoute from "./IndexRoute";

/* eslint-disable */
const routes = (
  <Route handler={App}>
    <DefaultRoute handler={IndexRoute} />
  </Route>
);
/* eslint-enable */

export default routes;
