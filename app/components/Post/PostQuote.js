"use strict";

import React, { PropTypes } from "react/addons";
import TitleBox from "./TitleBox";

const { PureRenderMixin } = React.addons;

class PostQuote extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post } = this.props;

    return (
      <div className={ className }>
        <quote dangerouslySetInnerHTML={{ __html: post.get("text") }} />
        { post.has("source") &&
          <span className="source">{ post.get("source") }</span>
        }
        <TitleBox post={ post } />
      </div>
    );
  }
}

export default PostQuote;
