"use strict";

import path from "path";
import assign from "object-assign";
import jsonp from "./jsonp";
import { arrayOf, normalize, Schema } from "normalizr";

const Post = new Schema("posts");
const Author = new Schema("authors");

const ENDPOINT_ROOT = "http://api.tumblr.com/v2/blog";
const TUMBLR = "brooklynunited.tumblr.com";
const API_KEY = "iiXyRVDvsjEMOJV1Ick83wXNir0GsHsH3NbIctuRjbPvVjq65Q";

export default {
  async getPosts(params = {}) {
    let url = makeUrl("posts");
    let data = await jsonp(url, assign({ apiKey: API_KEY }, params));
    const posts = camelify(data.response.posts);

    return normalize(posts, arrayOf(Post));
  },

  async getPost(postId) {
    let url = makeUrl("posts");
    let params = {
      apiKey: API_KEY,
      id: postId,
      reblogInfo: true,
      notesInfo: true
    };
    let data = await jsonp(url, params);
    const posts = camelify(data.response.posts);

    return normalize(posts, arrayOf(Post));
  },

  async getAuthor(name) {
    let url = makeUrl("posts");

    let params = {
      apiKey: API_KEY,
      tag: `_people:${name}`,
      reblogInfo: false,
      notesInfo: false
    };
    let data = await jsonp(url, params);
    const authors = camelify(data.response.posts);

    return normalize(authors, arrayOf(Author));
  },

  async getPostsByAuthor(name) {
    let url = makeUrl("posts");
    let params = {
      apiKey: API_KEY,
      tag: `_post.author:${name}`,
      reblogInfo: false,
      notesInfo: false
    };
    let data = await jsonp(url, params);
    const posts = camelify(data.response.posts);

    return normalize(posts, arrayOf(Post));
  },

  async getPostsByTagName(tagName) {
    let url = makeUrl("posts");
    let params = {
      apiKey: API_KEY,
      tag: tagName,
      reblogInfo: false,
      notesInfo: false
    };
    let data = await jsonp(url, params);
    const posts = camelify(data.response.posts);

    return normalize(posts, arrayOf(Post));
  }
};


const camelify = (posts) => posts.map(post => {
  return Object.keys(post).reduce((memo, key) => {
    const sanitized = key.replace(/_([A-Za-z])/g, (str, p) => p.toUpperCase());
    memo[sanitized] = post[key];

    return memo;
  }, {});
});

const underscorify = (posts) => posts.map(post => {
  return Object.keys(post).reduce((memo, key) => {
    const sanitized = key.replace(/[a-z][A-Z]/g, (...parts) => {
      const [str, p1, p2] = parts;
      return `${p1}_${p2.toLowerCase()()}`;
    });
    memo[sanitized] = post[key];

    return memo;
  });
});

const makeUrl = (resource) => {
  return ENDPOINT_ROOT + "/" + path.join(TUMBLR, resource);
};
