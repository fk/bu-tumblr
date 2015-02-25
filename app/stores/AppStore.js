"use strict";

import alt from "../alt";
import { OrderedMap, Map, fromJS } from "immutable";
import AppActionCreators from "../actions/AppActionCreators";

class AppStore {
  constructor() {
    this.bindActions(AppActionCreators);

    this.app = OrderedMap({
      navOpen: false
    });

    this.on('init', this.setup);
    this.on('bootstrap', this.setup);
  }

  setup() {
    if (! OrderedMap.isOrderedMap(this.app)) {
      this.app = fromJS(this.app, (key, value) => {
        return value.toOrderedMap();
      });
    }
  }
}

export default alt.createStore(AppStore, 'AppStore');
