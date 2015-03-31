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

  static getById(id) {
    let { posts } = this.getState();

    return posts.get(id);
  }

  onGetPosts() {

  }

  onGetPostsSuccess(resp = {}) {
    let { posts } = resp.entities;

    Object.keys(posts).forEach(id => {
      let post = posts[id];
      let { tags } = post;

      post.tags = tags.filter(tag => {
        if (/^_post\./.test(tag)) {
          let [prop, value] = tag.split(".").pop().split(":");

          post[prop] = value;

          return false;
        }

        return true;
      });
    });

    this.posts = this.posts.merge(posts);
  }

  onGetPostsError(err = null) {
    warning(err, "Get posts error");
  }

  onGetPost(id = null) {

  }

  onGetPostSuccess(resp = {}) {
    let { posts } = resp.entities;

    this.posts = this.posts.merge(posts);
  }

  onGetPostError(err = null) {
    if (err) {
      warning(err, "Get post error");
    }
  }
}

export default alt.createStore(PostStore, "PostStore");
