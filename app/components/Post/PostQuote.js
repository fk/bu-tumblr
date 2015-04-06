"use strict";

import React, { PropTypes } from "react/addons";

const { PureRenderMixin } = React.addons;

class PostQuote extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, single, post } = this.props;

    return (
      <div className={ className }>
        <quote dangerouslySetInnerHTML={{ __html: post.get("text") }} />
        { post.has("source") &&
          <span className="source">{ post.get("source") }</span>
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
