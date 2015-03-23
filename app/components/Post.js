"use strict";

import { Map } from "immutable";
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

    return (
      <Component
        { ...this.props }
        { ...this.state }
        post={ post } />
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
