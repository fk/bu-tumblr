"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";
import PureRender from "../../decorators/PureRender";

@PureRender
class TitleBox extends React.Component {
  render() {
    let { post } = this.props;
    let cx = classNames({
        "title-box": true,
        "no-title": !post.has("title")
      });

    return (
      <div className={ cx }>
        <h3>
          <Link
            to="post"
            title={ post.get("title") }
            params={{ postId: post.get("id") }}>
            { post.get("title") }
          </Link>
        </h3>
      </div>
    );
  }
}

export default TitleBox;
