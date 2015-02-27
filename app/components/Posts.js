"use strict";

import Post from "./Post";
import React from "react/addons";

var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Posts = React.createClass({
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
