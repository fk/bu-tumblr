"use strict";

import path from "path";
import jsonp from "./jsonp";
import { arrayOf, normalize, Schema } from "normalizr";

const Post = new Schema("posts");

const ENDPOINT_ROOT = "http://api.tumblr.com/v2/blog";
const TUMBLR = "flux-api.tumblr.com";
const API_KEY = "fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4";

export default {
  async getPosts() {
    let url = makeUrl("posts");
    let data = await jsonp(url, { apiKey: API_KEY });
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
