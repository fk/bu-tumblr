"use strict";

import alt from "../alt";
import TumblrAPI from "../utils/TumblrAPI";

class AuthorActionCreators {
  constructor() {
    this.generateActions(
      "getAuthorSuccess",
      "getAuthorError"
    );
  }

  async getAuthor(name) {
    this.dispatch();

    try {
      let response = await TumblrAPI.getAuthor(name);
      this.actions.getAuthorSuccess(response);
    }
    catch (err) {
      this.actions.getAuthorError(err);
    }
  }
}

export default alt.createActions(AuthorActionCreators);
