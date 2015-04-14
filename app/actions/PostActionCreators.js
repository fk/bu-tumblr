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
      "getPostError",
      "getPostsByTagNameSuccess",
      "getPostsByTagNameError"
    );
  }

  async getPosts(params = {}) {
    this.dispatch(params);

    try {
      let response = await TumblrAPI.getPosts(params);
      this.actions.getPostsSuccess(response);
      return response;
    }
    catch (err) {
      this.actions.getPostsError(err);
      return err;
    }
  }

  async getPost(id = null) {
    this.dispatch(id);

    try {
      let response = await TumblrAPI.getPost(id);
      this.actions.getPostSuccess(response);
      return response;
    }
    catch (err) {
      this.actions.getPostError(err);
      return err;
    }
  }

  async getPostsByTagName(tagName = null) {
    this.dispatch();

    try {
      let response = await TumblrAPI.getPostsByTagName(tagName);
      this.actions.getPostsByTagNameSuccess(response);
      return response;
    }
    catch (err) {
      this.actions.getPostsByTagNameError(err);
      return err;
    }
  }
}

export default alt.createActions(PostActionCreators);
