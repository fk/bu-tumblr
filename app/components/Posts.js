"use strict";

import React from "react/addons";
import Post from "./Post";

var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Posts = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    posts: PropTypes.object.isRequired
  },

  render() {
    let { posts: rawPosts } = this.props;
    let posts = [];

    for (let [id, post] of rawPosts.entries()) {
      posts.push(<Post key={ id } post={ post } />);
    }

    return (
      <div className="posts">
        {posts}
      </div>
    );
  }
});

export default Posts;
