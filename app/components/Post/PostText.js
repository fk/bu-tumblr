"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";
import classNames from "classnames";
import AuthorByLine from "../AuthorByLine";
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
    const { className, post, single, thumbnail, ...otherProps } = this.props;
    let body = !single && post.has("bodyAbstract") ?
      post.get("bodyAbstract") :
      post.get("body");

    if (thumbnail) {
      body = body.replace(/<(?:.|\n)*?>/gm, "")
        .split(".").splice(0, 2).join(".") + ".";
    }

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
          <div className="read-more-wrapper">
            <ReadMoreButton post={ post } />
          </div>
        }
        { post.has("author") &&
          <AuthorByLine post={ post } />
        }
      </div>
    );
  }
}
