"use strict";

import alt from "../alt";
import { OrderedMap, fromJS } from "immutable";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore {
  constructor() {
    this.bindActions(PostActionCreators);

    this.on('init', setup);
    this.on('bootstrap', setup);

    this.posts = OrderedMap();
  }

  setup() {
    if (! OrderedMap.isOrderedMap(this.posts)) {
      this.posts = fromJS(this.posts, (key, value) => {
        return OrderedMap(value);
      });
    }
  }

  onGetPosts() {

  }

  onGetPostsSuccess(resp = {}) {
    let { posts } = resp.entities;

    this.posts = this.posts.merge(posts);
  }

  onGetPostsError(err = null) {

  }

  onGetPostSuccess(resp = {}) {
    let { posts } = resp.entities;

    this.posts = this.posts.merge(posts);
  }

  onGetPostError(err = null) {

  }
}

export default alt.createStore(PostStore, 'PostStore');
