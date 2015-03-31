"use strict";

import React, { PropTypes } from "react/addons";
import warning from "react/lib/warning";
import classNames from "classnames";
import { Map, List } from "immutable";
import PostPhoto from "./PostPhoto";
import PostLink from "./PostLink";
import PostQuote from "./PostQuote";
import PostText from "./PostText";
import PostVideo from "./PostVideo";
import AppStore from "../../stores/AppStore";
import storeComponent from "../../utils/storeComponent";

const { PureRenderMixin } = React.addons;

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.animation = false;
    this.state = { inViewport: false };
    this.onAdjust = this.onAdjust.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  componentDidMount() {
    this.onAdjust();
    this.animation = requestAnimationFrame(this.onAdjust);
  }

  componentWillUnmount() {
    this.animation = cancelAnimationFrame(this.animation);
  }

  onAdjust() {
    try {
      const { viewport } = this.props;
      const node = React.findDOMNode(this);
      const inViewport = getInViewport(node);

      this.setState({ inViewport }, () => {
        this.animation = requestAnimationFrame(this.onAdjust);
      });
    }
    catch (err) {
      return false;
    }
  }

  render() {
    const { inViewport } = this.state;
    const { post, viewport, ...otherProps } = this.props;
    const Component = getPostComponent(post);
    const cx = classNames({
      "post": true,
      [`post-${post.get("type")}`]: true,
      "in-viewport": inViewport
    });

    return (
      <Component
        { ...otherProps }
        { ...this.state }
        post={ post }
        className={ cx } />
    );
  }
};

const getInViewport = (node) => {
  let rect = node.getBoundingClientRect();
  let windowHeight = window.innerHeight ||
    document.documentElement.clientHeight;
  let windowWidth = window.innerWidth ||
    document.documentElement.clientWidth

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= windowHeight &&
    rect.left <= windowWidth
  );
};

const getStoreStates = (params) => {
  const { app } = AppStore.getState();
  const viewport = app.get("viewport");

  return { viewport };
};

const getPostComponent = (post) => {
  const postType = post.get("type");

  switch (postType) {
    case "text":
      return PostText;
    case "video":
      return PostVideo;
    case "link":
      return PostLink;
    case "quote":
      return PostQuote;
    case "photo":
      return PostPhoto;
    default:
      console.warn(post.get("type"), "is unhandled.");
      return false;
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

      return null;
    }
  })
};

export default storeComponent(Post, [AppStore], getStoreStates);
