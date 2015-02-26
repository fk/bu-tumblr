"use strict";

import alt from "../alt";

class RouterActionCreators {
  constructor() {
    this.generateActions(
      'routeChange'
    );
  }
}

export default alt.createActions(RouterActionCreators);
