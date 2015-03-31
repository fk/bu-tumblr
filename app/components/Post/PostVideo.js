"use strict";

import React, { PropTypes } from "react/addons";
import TitleBox from "./TitleBox";

const { PureRenderMixin } = React.addons;

class PostVideo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post } = this.props;
    let embed = post.getIn(["player", 2, "embed_code"]);

    return (
      <div className={ className }>
        <div
          className="player"
          dangerouslySetInnerHTML={{ __html: embed }} />
        <TitleBox post={ post } />
      </div>
    );
  }
}

export default PostVideo;
