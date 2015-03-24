"use strict";

import alt from "../alt";
import { OrderedMap, Map, List, fromJS } from "immutable";
import AppActionCreators from "../actions/AppActionCreators";

class AppStore {
  constructor() {
    this.bindActions(AppActionCreators);

    this.app = new OrderedMap({
      homeUrl: "http://brooklynunited.com",
      navOpen: false,
      mastheadColor: "#58AEDF",
      fixedHeader: false,
      viewport: List.of(0, 0, 0, 0)
    });

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.app)) {
      this.app = fromJS(this.app, (key, value) => {
        return value.toOrderedMap();
      });
    }
  }

  onSetScrollState({x, y, w, h}) {
    this.app = this.app.set("fixedHeader", y > 465);
    this.app = this.app.set("viewport", List.of(x, y, w, h));
  }

  onToggleNavigation() {
    let navState = !this.app.get("navOpen");
    this.app = this.app.set("navOpen", navState);
  }
}

export default alt.createStore(AppStore, "AppStore");
