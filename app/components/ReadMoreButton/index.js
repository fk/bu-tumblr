"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";

const { PureRenderMixin } = React.addons;

class ReadMoreButton extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

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
