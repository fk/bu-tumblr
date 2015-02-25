"use strict";

import alt from "../alt";

class PostActionCreators {
  constructor() {
    this.generateActions(
      'getPosts'
    );
  }
}

export default alt.createActions(PostActionCreators);
