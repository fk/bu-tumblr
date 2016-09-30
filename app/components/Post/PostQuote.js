"use strict";

import React, { PropTypes } from "react";
import AuthorByLine from "../AuthorByLine";
import PureRender from "../../decorators/PureRender";

@PureRender
class PostQuote extends React.Component {
  render() {
    const { className, single, post } = this.props;

    return (
      <div className={ className }>
        <quote dangerouslySetInnerHTML={{ __html: post.get("text") }} />
        { post.has("source") &&
          <span className="source">{ post.get("source") }</span>
        }
        { post.has("author") &&
          <AuthorByLine post={ post } />
        }
      </div>
    );
  }
}

PostQuote.propTypes = {
  post: PropTypes.object.isRequired,
  single: PropTypes.bool
};

PostQuote.defaultProps = {
  single: false
};

export default PostQuote;
