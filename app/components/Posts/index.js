"use strict";

import React, { PropTypes } from "react/addons";
import Post from "../Post";

const { PureRenderMixin } = React.addons;

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    let { posts } = this.props;

    return (
      <div className="posts">
        { posts.map((post, key) => {
          return (
            <Post
              className={ `post post-${post.get("type")}` }
              key={ key }
              post={ post } />
          );
        }) }
      </div>
    );
  }
};
