"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import PureRender from "../../decorators/PureRender";

@PureRender
class PostVideo extends React.Component {
  componentDidMount() {
    let { twttr, instgrm } = window;

    if (twttr) {
      twttr.ready(() => {
        twttr.widgets.load();
      });
    }

    if (instgrm) {
      instgrm.Embeds.process();
    }
  }

  render() {
    const { className, post, single } = this.props;
    let embed = post.getIn(["player", 2, "embed_code"]);

    return (
      <div className={ classNames([className, post.get("videoType")]) }>
        <div>
        <div
          className="video-container"
          dangerouslySetInnerHTML={{ __html: embed }} />
        </div>
        <div className="post-body">
          { post.has("caption") && !!post.get("caption").trim() &&
          <span
              className="post-caption"
              dangerouslySetInnerHTML={{ __html: post.get("caption") }} />
          }
          { post.has("author") &&
          <AuthorByLine post={ post } />
          }
        </div>
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
