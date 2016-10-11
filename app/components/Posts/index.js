"use strict";

import React, { PropTypes } from "react";
import Post from "../Post";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class Posts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { posts } = this.props;

    return (
      <div className="posts">
        { posts.entrySeq().map( ([key, post]) =>
          <Post
              className={ `post post-${post.get("type")}` }
              key={ key }
              index={ key }
              post={ post } />
        ) }
      </div>
    );
  }
}
