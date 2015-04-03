"use strict";

import koa from "koa";
import { join } from "path";
import alt from "../alt";
import React from "react";
import cheerio from "cheerio";
import serialize from "serialize-javascript";
import ReactRouter from "react-router";
import routes from "../routes";
import compress from "koa-compress";
import serveStatic from "koa-static";
import bodyparser from "koa-bodyparser";
import RouterActionCreators from "../actions/RouterActionCreators";

const ENV = process.env.NODE_ENV || "development";
const DEV = ENV === "development";
const PORT = process.env.PORT || 3000;

let app = koa();

function isomorphic() {
  return function *() {
    // Handle redirects from ReactRouter.
    function onAbort (aborted) {
      let { to, params, query } = aborted;
      let url = ReactRouter.makePath(to, params, query);

      this.redirect(url);
    };

    // Instantiate server-side routing.
    let { url: location } = this.req;
    let routes = require("../routes");
    let router = ReactRouter.create({ location, routes, onAbort });

    // Run router and fetch async data.
    let [Handler, state] = yield new Promise((resolve, reject) => {
      router.run((...args) => {
        let [Handler, state] = args;
        let promiseArray = state.routes
          .filter(route => route.handler.fetchData)
          .map(route => route.handler.fetchData(state));

        RouterActionCreators.routeChange(state);

        Promise.all(promiseArray)
          .then(data => resolve(args))
          .catch(reject);
      });
    });

    // Render markup and inject data.
    let markup = React.renderToString(
      <Handler { ...state } />
    );
    let $ = cheerio.load(markup);
    let snapshot = serialize(alt.flush());
    let bundle = DEV ? "http://localhost:9000/dist/bundle.js" : "/bundle.min.js";
    let lr = DEV ?
      "<script src=\"http://localhost:35729/livereload.js?snipver=1\"></script>" :
      "";

    $("body")
      .append(`<script>var snapshot = ${snapshot};</script>`)
      .append(`<script src="${bundle}"></script>`)
      .append(lr);

    this.body = `<!doctype html>${$.html()}`;
  };
}

app.use(compress());
app.use(bodyparser());
app.use(serveStatic(join(__dirname, "../../public")));
app.use(isomorphic());

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  else if (DEV) {
    console.log(`Server running at http://localhost:${PORT}`);
  }
});
