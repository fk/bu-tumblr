"use strict";

import alt from "./alt";
import React from "react";
import router from "./router";
import RouterActionCreators from "./actions/RouterActionCreators";

let { snapshot } = window;
alt.bootstrap(snapshot);

router.run((Handler, state) => {
  RouterActionCreators.routeChange(state);
  React.render(<Handler { ...state } />, document);
});
