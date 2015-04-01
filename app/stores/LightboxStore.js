"use strict";

import alt from "../alt";
import { List, OrderedMap } from "immutable";
import LightboxActionCreators from "../actions/LightboxActionCreators";

class LightboxStore {
  constructor() {
    this.bindActions(LightboxActionCreators);
    this.ligtbox = new OrderedMap({
      photos: new List(),
      index: 0
    });

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {

  }

  onOpenLightboxWithPhotosAtIndex(photos, index) {

  }
}

export default alt.createStore("LightboxStore", LightboxStore);
