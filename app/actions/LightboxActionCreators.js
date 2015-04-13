"use strict";

import alt from "../alt";

class LightboxActionCreators {
  constructor() {
    this.generateActions(
      "openLightboxWithPhotosAtIndex",
      "closeLightbox",
      "setIndex",
      "moveBack",
      "moveForward"
    );
  }
}

export default alt.createActions(LightboxActionCreators);
