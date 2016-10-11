"use strict";

import React, { PropTypes } from "react";
import AuthorByLine from "../AuthorByLine";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class PostQuote extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    single: PropTypes.bool
  }

  static defaultProps = {
    single: false
  }

  render() {
    const { className, single, post } = this.props;

    return (
      <div className={ className }>
        <quote dangerouslySetInnerHTML={{ __html: post.get("text") }} />
        { post.has("source") &&
          <span className="source"
                dangerouslySetInnerHTML={{ __html: post.get("source") }} />
        }
        { post.has("author") &&
          <AuthorByLine post={ post } />
        }
      </div>
    );
  }
}
