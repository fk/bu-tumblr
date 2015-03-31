"use strict";

import React, { PropTypes } from "react/addons";
import ShareBox from "../ShareBox";

const { PureRenderMixin } = React.addons;

class PostText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post, ...otherProps } = this.props;

    return (
      <div className={ className }>
        <h3>{ post.get("title") }</h3>
        <div
          className="text-body"
          dangerouslySetInnerHTML={{ __html: post.get("body") }} />
        <ShareBox />
      </div>
    );
  }
}

export default PostText;
