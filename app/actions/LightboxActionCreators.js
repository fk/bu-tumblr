"use strict";

import alt from "../alt";

class LightboxActionCreators {
  constructor() {
    this.generateActions(
      "openLightboxWithPhotosAtIndex"
    );
  }
}

export default alt.createActions(LightboxActionCreators);
