"use strict";

import { Map } from "immutable";
import classNames from "classnames";
import PostPhoto from "./PostPhoto";
import React, { PropTypes } from "react/addons";

const { PureRenderMixin } = React.addons;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;
    const Component = getPostComponent(post);
    const cx = classNames({
      "post": true,
      [`post-${post.get("type")}`]: true
    });

    return (
      <Component
        { ...this.props }
        { ...this.state }
        post={ post }
        className={ cx } />
    );
  }
};

const getPostComponent = (post) => {
    const postType = post.get("type");

    switch (postType) {
      case "photo":
        return PostPhoto;
    }
};

Post.propTypes = {
  post: PropTypes.shape({
    type(props, propName, componentName) {
      return Map.isMap(props) && props.has("type");
    }
  })
};
