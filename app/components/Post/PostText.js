"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";
import ShareBox from "../ShareBox";

const { PureRenderMixin } = React.addons;

class PostText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post, single, ...otherProps } = this.props;

    console.log(className);

    return (
      <div className={ classNames([className, { "single": single }]) }>
        { !single &&
          <h3>{ post.get("title") }</h3>
        }
        <div
          className="text-body"
          dangerouslySetInnerHTML={{ __html: post.get("body") }} />
        {! single &&
          <ShareBox post={ post } />
        }
      </div>
    );
  }
}

PostText.propTypes = {
  post: PropTypes.object.isRequired,
  single: PropTypes.bool
};

PostText.defaultProps = {
  single: false
};

export default PostText;
