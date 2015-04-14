"use strict";

import alt from "../alt";
import { Iterable, OrderedMap, fromJS } from "immutable";
import RouterActionCreators from "../actions/RouterActionCreators";

class RouterStore {
  constructor() {
    this.bindActions(RouterActionCreators);

    this.router = new OrderedMap();

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.router)) {
      this.router = fromJS(this.router, (key, value) => {
        let isIndexed = Iterable.isIndexed(value);
        return isIndexed ? value.toList() : value.toOrderedMap();
      });
    }
  }

  onRouteChange(state) {
    this.router = this.router.merge(state);
  }
}

export default alt.createStore(RouterStore, "RouterStore");
