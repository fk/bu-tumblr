"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";

const { PureRenderMixin } = React.addons;

class TitleBox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    let { post } = this.props;
    let cx = classNames({
        "title-box": true,
        "no-title": !post.has("title")
      });

    return (
      <div className={ cx }>
        <h3>{ post.get("title") }</h3>
      </div>
    );
  }
}

export default TitleBox;
