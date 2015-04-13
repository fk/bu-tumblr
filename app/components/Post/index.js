"use strict";

import React, { PropTypes } from "react";
import warning from "react/lib/warning";
import classNames from "classnames";
import { Map, List } from "immutable";
import PostPhoto from "./PostPhoto";
import PostLink from "./PostLink";
import PostQuote from "./PostQuote";
import PostText from "./PostText";
import PostVideo from "./PostVideo";
import TitleBox from "../TitleBox";
import ShareBox from "../ShareBox";
import AppStore from "../../stores/AppStore";
import autobind from "../../decorators/autobind";
import StoreComponent from "../../decorators/StoreComponent";
import PureRender from "../../decorators/PureRender";
import { getInViewport, getViewPort } from "../../utils/viewport";

@PureRender
@StoreComponent(AppStore)
export default class Post extends React.Component {
  static propTypes = {
    thumbnail: PropTypes.bool,
    single: PropTypes.bool,
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
  }

  defaultProps = {
    thumbnail: false,
    single: false
  }

  static getStateFromStores(props) {
    const { app } = AppStore.getState();
    const viewport = app.get("viewport");

    return { viewport };
  }

  constructor(props) {
    super(props);

    this.animation = false;
    this.state = { inViewport: false, height: 0, viewed: false };
  }

  componentDidMount() {
    let node = React.findDOMNode(this);
    let height = node.clientHeight;

    this.setState({ height });
    this.onAdjust();
  }

  componentWillUnmount() {
    this.animation = cancelAnimationFrame(this.animation);
  }

  @autobind
  onAdjust() {
    try {
      let { viewed } = this.state;
      const { viewport, index } = this.props;
      const node = React.findDOMNode(this);
      const inViewport = getInViewport(node);
      const drag = 250;

      let [viewportX, viewportY, viewportWidth, viewportHeight] = viewport
        .toArray();
      let { top: postTop, height: postHeight } = node
        .getBoundingClientRect();
      let start = postTop - viewportHeight + 75;
      let transition = viewed ?
        0 :
        1 - Math.min(Math.abs(Math.min(0, start)), drag) / drag;

      if (transition === 0) {
        viewed = true;
      }

      this.setState({ inViewport, transition, viewed }, () => {
        this.animation = requestAnimationFrame(this.onAdjust);
      });
    }
    catch (err) {
      console.log(err);
      return false;
    }
  }

  render() {
    const { inViewport, height, transition } = this.state;
    const { post, viewport, thumbnail, single, ...otherProps } = this.props;
    const Component = getPostComponent(post);
    const cx = classNames({
      "post": true,
      [`post-${post.get("type")}`]: true,
      "in-viewport": inViewport
    });
    const styles = {
      WebkitTransform: `translate3d(0, ${(transition || 0) * 100}px, 0) ` +
        `scale(${(0.2 * transition ) + 1})`,
      opacity: 1 - transition
    };
    const hasTitle = (
      ["text"].indexOf(post.get("type")) === -1
    );

    return (
      <div
        className={ classNames(["post-wrapper", {
          thumbnail,
          single
        }]) }
        style={ styles }>
        { !(single || thumbnail) && hasTitle &&
          <TitleBox post={ post } />
        }
        <Component
          { ...otherProps }
          { ...this.state }
          inViewport={ inViewport }
          transition={ transition }
          post={ post }
          className={ cx } />
        { !(single || thumbnail) &&
          <ShareBox post={ post } />
        }
      </div>
    );
  }
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
      return PostText;
  }
};
