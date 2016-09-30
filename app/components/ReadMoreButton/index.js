"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import PureRender from "../../decorators/PureRender";

@PureRender
class ReadMoreButton extends React.Component {
  render() {
    let { post } = this.props;

    return (
      <Link
        to="post"
        params={{ postId: post.get("id"), postUri: post.get("uri") }}
        className="read-more-button">
        <h5>Read More <i className="fa fa-chevron-right" /></h5>
      </Link>
    );
  }
}

export default ReadMoreButton;
