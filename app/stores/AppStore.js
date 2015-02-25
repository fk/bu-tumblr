"use strict";

import alt from "../alt";
import { OrderedMap, Map, fromJS } from "immutable";
import AppActionCreators from "../actions/AppActionCreators";

class AppStore {
  constructor() {
    this.bindActions(AppActionCreators);

    this.app = OrderedMap({
      homeUrl: 'http://brooklynunited.com',
      navOpen: false,
      mastheadColor: '#58AEDF',
      fixedHeader: false
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

  onSetScrollState(dY) {
    this.app = this.app.set('fixedHeader', dY > 465);
  }

  onToggleNavigation() {
    let navState = !this.app.get('navOpen');
    this.app = this.app.set('navOpen', navState);
  }
}

export default alt.createStore(AppStore, 'AppStore');
