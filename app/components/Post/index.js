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
import AuthorByLine from "../AuthorByLine";
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
  }

  render() {
    const {
      inViewport,
      height,
      width,
      transition
    } = this.state;

    const {
      post,
      viewport,
      thumbnail,
      single,
      condensed,
      ...otherProps
    } = this.props;

    const Component = getPostComponent(post);

    const cx = classNames({
      "post": true,
      [`post-${post.get("type")}`]: true,
      "in-viewport": inViewport
    });

    const hasTitle = (
      ["text"].indexOf(post.get("type")) === -1
    ) && post.has("title");

    return (
      <div
        className={ classNames(["post-wrapper", `post-${post.get("type")}`, {
          thumbnail,
          single
        }]) }>
        <header className="post-header">
          { !(single || thumbnail) && hasTitle &&
            <TitleBox post={ post } />
          }
          { !(single) &&
            <ShareBox
              thumbnail={ thumbnail }
              post={ post } />
          }
        </header>
        <Component
          { ...otherProps }
          { ...this.state }
          condensed={ condensed }
          single={ single }
          thumbnail={ thumbnail }
          inViewport={ inViewport }
          transition={ transition }
          post={ post }
          className={ cx } />
      </div>
    );
  }
}

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
