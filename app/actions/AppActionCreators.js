"use strict";

import alt from "../alt";

class AppActionCreators {
  constructor() {
    this.generateActions(
      "toggleNavigation",
      "setScrollState"
    );
  }
}

export default alt.createActions(AppActionCreators);
