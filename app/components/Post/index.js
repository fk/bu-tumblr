"use strict";

import React, { PropTypes } from "react/addons";
import warning from "react/lib/warning";
import classNames from "classnames";
import { Map, List } from "immutable";
import PostPhoto from "./PostPhoto";
import AppStore from "../../stores/AppStore";
import storeComponent from "../../utils/storeComponent";

const { PureRenderMixin } = React.addons;

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inViewport: false };
    this.onAdjust = this.onAdjust.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onAdjust, false);
    window.addEventListener("resize", this.onAdjust, false);
    this.onAdjust();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onAdjust);
    window.removeEventListener("resize", this.onAdjust);
  }

  onAdjust() {
    const { viewport } = this.props;
    const [x, y, width, height] = viewport.toArray();
    const node = React.findDOMNode(this);


    let inViewport = getInViewport([x, y, width, height]);

    this.setState({ inViewport });
  }

  render() {
    const { post, viewport } = this.props;
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

const getInViewport = (x, y, width, height) => {

};

const getStoreStates = (params) => {
  const { app } = AppStore.getState();
  const viewport = app.get("viewport");

  return { viewport };
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
      warning(
        Map.isMap(props) && props.has("type"),
        "Expected Post.props.post to be an instance of Map() and to have " +
        "a \"type\" property."
      );
    }
  }),
  viewport(props, propName, componentName) {
    // console.log(props, propName, componentName);
  }
};

export default storeComponent(Post, [AppStore], getStoreStates);
