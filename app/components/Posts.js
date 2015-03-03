"use strict";

import Post from "./Post";
import React from "react/addons";

const { PropTypes } = React;
const { PureRenderMixin } = React.addons;

let Posts = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let posts = [];
    let { posts: rawPosts } = this.props;

    for (let [id, post] of rawPosts.entries()) {
      posts.push(
        <Post key={id} post={post} />
      );
    }

    return (
      <div className="posts">
        { posts }
      </div>
    );
  }
});

export default Posts;
