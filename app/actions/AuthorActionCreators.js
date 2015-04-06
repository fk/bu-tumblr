"use strict";

import alt from "../alt";
import assign from "object-assign";
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
      let calls = [];
      let data = { entities: {}, result: [] };
      calls.push(TumblrAPI.getAuthor(name));
      calls.push(TumblrAPI.getPostsByAuthor(name));

      for (let call of calls) {
        let response = await call;

        data.entities = assign(data.entities, response.entities);
        data.result = data.result.concat(response.result);
      }

      this.actions.getAuthorSuccess(data);
    }
    catch (err) {
      this.actions.getAuthorError(err);
    }
  }
}

export default alt.createActions(AuthorActionCreators);
