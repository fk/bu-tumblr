"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";

const { PureRenderMixin } = React.addons;

class PostVideo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post, single } = this.props;
    let embed = post.getIn(["player", 2, "embed_code"]);

    return (
      <div className={ classNames([className, post.get("videoType")]) }>
        <div
          className="player"
          dangerouslySetInnerHTML={{ __html: embed }} />
        { post.has("author") &&
          <AuthorByLine post={ post } />
        }
      </div>
    );
  }
}

PostVideo.propTypes = {
  post: PropTypes.object.isRequired,
  single: PropTypes.bool
};

PostVideo.defaultProps = {
  single: false
};

export default PostVideo;
