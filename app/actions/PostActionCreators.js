"use strict";

import alt from "../alt";
import TumblrAPI from "../utils/TumblrAPI";
import invariant from "react/lib/invariant";

class PostActionCreators {
  constructor() {
    this.generateActions(
      "getPostsSuccess",
      "getPostsError",
      "getPostSuccess",
      "getPostError"
    );
  }

  getPosts() {
    this.dispatch();

    return TumblrAPI.getPosts()
      .then(this.actions.getPostsSuccess)
      .catch(this.actions.getPostsError);
  }

  getPost(id = null) {
    let type = Object.prototype.toString.call(id);

    invariant(
      type === "[object String]",
      "PostActionCreators.getPost(...): Please provide a valid number id. " +
      "Received `%s`",
      type
    );

    this.dispatch(id);

    return TumblrAPI.getPost(id)
      .then(this.actions.getPostSuccess)
      .catch(this.actions.getPostError);
  }
}

export default alt.createActions(PostActionCreators);
