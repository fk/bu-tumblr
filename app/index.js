"use strict";

require("babel/polyfill");

import alt from "./alt";
import React from "react";
import router from "./router";
import RouterActionCreators from "./actions/RouterActionCreators";

let bootstrapping = true;
let { payload, twttr } = window;
alt.bootstrap(payload);

router.run((Handler, state) => {
  try {
    fetchData(state);

    RouterActionCreators.routeChange(state);
    React.render(<Handler { ...state } />, document.getElementById("root"));
  }
  catch (err) {
    document.body.innerHTML = err.stack;
  }
});

async function fetchData(state) {
  let routes = state.routes.filter(route => route.handler.fetchData);
  let data = {};

  if (!bootstrapping) {
    bootstrapping = false;

    return true;
  }

  for (let route of routes) {
    let { handler } = route;
    let { displayName } = handler;

    try {
      data[displayName] = await handler.fetchData(state.params, state.query);
    }
    catch (err) { }
  }

  return data;
}
