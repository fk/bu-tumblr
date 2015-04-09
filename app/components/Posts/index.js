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
        <h3 style={{ position: "fixed", top: 10, right: 10, zIndex: 10000 }}>{ posts.size }</h3>
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
