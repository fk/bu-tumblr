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

  onCloseLightbox() {
    this.lightbox = this.lightbox.merge({
      photos: new List(),
      index: 0
    });
  }

  onSetIndex(index) {
    this.lightbox = this.lightbox.merge({
      index: index
    });
  }

  onMoveBack() {
    let index = this.lightbox.get("index");
    index = setCurrentIndex(index - 1, this.lightbox.get("photos").size);
    this.lightbox = this.lightbox.merge({ index });
  }

  onMoveForward() {
    let index = this.lightbox.get("index");
    index = setCurrentIndex(index + 1, this.lightbox.get("photos").size);
    this.lightbox = this.lightbox.merge({ index });
  }
}

const setCurrentIndex = (index, size) => {
  if (index >= size) {
    index = 0;
  }
  else if (index < 0) {
    index = size - 1;
  }

  return index;
}

export default alt.createStore(LightboxStore, "LightboxStore");
