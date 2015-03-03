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
  if (!bootstrapped) {
    let { routes } = state;
    routes.filter(r => r.handler.fetchData)
      .forEach(r => r.handler.fetchData(state));

    bootstrapped = true;
  }
  RouterActionCreators.routeChange(state);
  React.render(<Handler { ...state } />, document);
});
