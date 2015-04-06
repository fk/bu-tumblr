import React from "react";
import {Route, DefaultRoute} from "react-router";

import App from "./components/App";
import IndexRoute from "./components/IndexRoute";
import BioRoute from "./components/BioRoute";
import PostRoute from "./components/PostRoute";

/* eslint-disable */
const routes = (
  <Route handler={App}>
    <DefaultRoute handler={IndexRoute} />
    <Route name="post" path="/post/:postId" handler={PostRoute} />
    <Route name="author" path="/author/:authorName" handler={BioRoute} />
  </Route>
);
/* eslint-enable */

export default routes;
