"use strict";

import React, { PropTypes } from "react";

class PostLink extends React.Component {
  render() {
    const { className, post, single, thumbnail, ...otherProps } = this.props;

    return (
      <div className={ className }>
        { post.get("url") }
      </div>
    );
  }
}

export default PostLink;
