"use strict";

import alt from "../alt";
import { Map, fromJS } from "immutable";
import RouterActionCreators from "../actions/RouterActionCreators";

class RouterStore {
  constructor() {
    this.bindActions(RouterActionCreators);

    this.router = new Map();

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!Map.isMap(this.router)) {
      this.router = fromJS(this.router, (key, value) => new Map(value));
    }
  }

  onRouteChange(state) {
    this.router = new Map(state);
  }
}

export default alt.createStore(RouterStore);
