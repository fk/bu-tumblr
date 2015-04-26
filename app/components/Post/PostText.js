"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";
import classNames from "classnames";
import ReadMoreButton from "../ReadMoreButton";

const { PureRenderMixin } = React.addons;

export default class PostText extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    single: PropTypes.bool
  }

  static defaultProps = {
    single: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { className, post, single, ...otherProps } = this.props;
    let body = !single && post.has("bodyAbstract") ?
      post.get("bodyAbstract") :
      post.get("body");

    return (
      <div className={ classNames([className, { "single": single }]) }>
        { !single &&
          <h3>{ post.get("title") }</h3>
        }
        <div
          className="text-body"
          dangerouslySetInnerHTML={{ __html: body }} />
        {
          !single && post.has("bodyAbstract") &&
          <ReadMoreButton post={ post } />
        }
      </div>
    );
  }
}
