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

    return normalize(data.response.posts, arrayOf(Post));
  }
};

let makeUrl = (resource) => {
  return ENDPOINT_ROOT + "/" + path.join(TUMBLR, resource);
};
