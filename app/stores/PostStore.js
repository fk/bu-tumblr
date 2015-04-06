"use strict";

import alt from "../alt";
import sanitize from "../utils/sanitize";
import warning from "react/lib/warning";
import { Iterable, OrderedMap, fromJS } from "immutable";
import PostActionCreators from "../actions/PostActionCreators";
import AuthorActionCreators from "../actions/AuthorActionCreators";

class PostStore {
  constructor() {
    this.bindActions(PostActionCreators);
    this.bindActions(AuthorActionCreators);

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

  static getPostsByAuthor(authorName) {
    let { posts } = this.getState();

    return posts
      .filter(post => {
        return post.get("tags").indexOf(`_post.author:${authorName}`) > -1;
      });
  }

  static getById(id) {
    let { posts } = this.getState();

    return posts.get(id);
  }

  onGetPosts() {

  }

  onGetAuthorSuccess(resp = {}) {
    this.onGetPostsSuccess.call(this, resp);
    console.log(this.posts);
  }

  onGetPostsSuccess(resp = {}) {
    let { posts } = resp.entities;

    posts = sanitize(posts);

    this.posts = this.posts.merge(posts);
  }

  onGetPostsError(err = null) {
    warning(err, "Get posts error");
  }

  onGetPost(id = null) {

  }

  onGetPostSuccess(resp = {}) {
    let { posts } = resp.entities;

    posts = sanitize(posts);

    this.posts = this.posts.merge(posts);
  }

  onGetPostError(err = null) {
    if (err) {
      warning(err, "Get post error");
    }
  }
}

export default alt.createStore(PostStore, "PostStore");
