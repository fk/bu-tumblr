"use strict";

require("babel/polyfill");

import alt from "./alt";
import React from "react";
import router from "./router";
import RouterActionCreators from "./actions/RouterActionCreators";

let bootstrapped = false;
let { snapshot } = window;
alt.bootstrap(snapshot);

router.run((Handler, state) => {
  fetchData(state);

  RouterActionCreators.routeChange(state);
  React.render(<Handler { ...state } />, document);
});

async function fetchData(state) {
  let routes = state.routes.filter(route => route.handler.fetchData);
  let data = {};

  if (!bootstrapped) {
    return true;
  }

  for (let route of routes) {
    let { handler } = route;
    let { displayName } = handler;

    try {
      data[displayName] = await handler.fetchData(state);
    }
    catch (err) { }
  }

  bootstrapped = true;

  return data;
}
