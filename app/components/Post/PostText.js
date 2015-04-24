"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";

const { PureRenderMixin } = React.addons;

class PostText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post, single, ...otherProps } = this.props;
    let body = post.get("body");

    // if (!single) {
    //   body = body.replace(/(<([^>]+)>)/ig, "");
    // }

    return (
      <div className={ classNames([className, { "single": single }]) }>
        { !single &&
          <h3>{ post.get("title") }</h3>
        }
        <div
          className="text-body"
          dangerouslySetInnerHTML={{ __html: body }} />
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
