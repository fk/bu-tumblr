import React from "react";
import {
  Route,
  DefaultRoute,
  NotFoundRoute
} from "react-router";
import App from "./components/App";
import Index from "./components/IndexRoute";
import Post from "./components/PostRoute";
import Tag from "./components/TagRoute";
import Author from "./components/AuthorRoute";
import NotFound from "./components/NotFoundRoute";

export default (
  <Route
    handler={ App }>
    <DefaultRoute
      handler={ Index } />
    <Route
      name="post"
      path="/post/:postId/?:postUri?"
      handler={ Post } />
    <Route
      name="tag"
      path="/tagged/:tagName"
      handler={ Tag } />
    <Route
      name="author"
      path="/author/:authorName"
      handler={ Author } />
    <NotFoundRoute
      handler={ NotFound } />
  </Route>
);
