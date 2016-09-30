"use strict";

import alt from "../alt";
import TumblrAPI from "../utils/TumblrAPI";

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

  getPosts(params = {}) {
    return async (dispatch) => {
      dispatch(params);

      try {
        let response = await TumblrAPI.getPosts(params);
        this.getPostsSuccess(response);
        return response;
      }
      catch (err) {
        this.getPostsError(err);
        return err;
      }
    };
  }

  getPost(id = null) {
    return async (dispatch) => {
      dispatch(id);

      try {
        let response = await TumblrAPI.getPost(id);
        this.getPostSuccess(response);
        return response;
      }
      catch (err) {
        this.getPostError(err);
        return err;
      }
    };
  }

  getPostsByTagName(tagName = null) {
    return async (dispatch) => {
      dispatch();

      try {
        let response = await TumblrAPI.getPostsByTagName(tagName);
        this.getPostsByTagNameSuccess(response);
        return response;
      }
      catch (err) {
        this.getPostsByTagNameError(err);
        return err;
      }
    };
  }
}

export default alt.createActions(PostActionCreators);
