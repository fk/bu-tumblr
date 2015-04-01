"use strict";

import alt from "../alt";
import { List, OrderedMap, Iterable, fromJS } from "immutable";
import LightboxActionCreators from "../actions/LightboxActionCreators";

class LightboxStore {
  constructor() {
    this.bindActions(LightboxActionCreators);
    this.lightbox = new OrderedMap({
      photos: new List(),
      index: 0
    });

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.lightbox)) {
      this.lightbox = fromJS(this.lightbox, (key, value) => {
        let isIndexed = Iterable.isIndexed(value);
        return isIndexed ? value.toList() : value.toOrderedMap();
      });
    }
  }

  onOpenLightboxWithPhotosAtIndex({ photos, index }) {
    this.lightbox = this.lightbox.merge({ photos, index });
  }
}

export default alt.createStore(LightboxStore, "LightboxStore");
