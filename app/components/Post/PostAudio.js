"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class PostAudio extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    single: PropTypes.bool
  }

  static defaultProps = {
    single: false
  }

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
    let embed = post.get("player");

    return (
      <div className={ classNames([className, post.get("type")]) }>
        <div>
          <div
            className="audio-container"
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
