"use strict";

import alt from "../alt";
import warning from "react/lib/warning";
import { Iterable, OrderedMap, fromJS } from "immutable";
import PostActionCreators from "../actions/PostActionCreators";

class PostStore {
  constructor() {
    this.bindActions(PostActionCreators);

    this.posts = new OrderedMap();

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.posts)) {
      this.posts = fromJS(this.posts, (key, value) => {
        let isIndexed = Iterable.isIndexed(value);
        return isIndexed ? value.toList() : value.toOrderedMap();
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
    if (err) {
      warning("Get posts error");
    }
  }

  onGetPost(id = null) {

  }

  onGetPostSuccess(resp = {}) {
    let { posts } = resp.entities;

    this.posts = this.posts.merge(posts);
  }

  onGetPostError(err = null) {
    if (err) {
      warning("Get post error");
    }
  }
}

export default alt.createStore(PostStore, "PostStore");
