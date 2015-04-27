import React from "react";
import {
  Route,
  DefaultRoute,
  NotFoundRoute
} from "react-router";

export default (
  <Route
    handler={ require("./components/App") }>
    <DefaultRoute
      handler={ require("./components/IndexRoute") } />
    <Route
      name="post"
      path="/post/:postId/?:postUri?"
      handler={ require("./components/PostRoute") } />
    <Route
      name="tag"
      path="/tag/:tagName"
      handler={ require("./components/TagRoute") } />
    <Route
      name="author"
      path="/author/:authorName"
      handler={ require("./components/AuthorRoute") } />
    <NotFoundRoute
      handler={ require("./components/NotFoundRoute") } />
  </Route>
);
