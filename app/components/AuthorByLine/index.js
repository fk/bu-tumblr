"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";
import { nameToURI } from "../../utils/uri";

export default class AuthorByLine extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    let { post } = this.props;
    let date = moment(new Date(post.get("date"))).format("MMMM DD, YYYY");

    return (
      <div className="author">
        By <Link
          to="author"
          params={{ authorName: nameToURI(post.get("author")) }}>
          { post.get("author") }
        </Link> on { date }
      </div>
    );
  }
}
