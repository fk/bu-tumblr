"use strict";

import alt from "../alt";

class AppActionCreators {
  constructor() {
    this.generateActions(
      'toggleNavigation'
    );
  }
}

export default alt.createActions(AppActionCreators);
