"use strict";

import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import warning from "warning";
import classNames from "classnames";
import { Map, List } from "immutable";
import PostPhoto from "./PostPhoto";
import PostLink from "./PostLink";
import PostQuote from "./PostQuote";
import PostText from "./PostText";
import PostVideo from "./PostVideo";
import PostAnswer from "./PostAnswer";
import PostAudio from "./PostAudio";
import TitleBox from "../TitleBox";
import ShareBox from "../ShareBox";
import AppStore from "../../stores/AppStore";
import storeComponent from "../../decorators/storeComponent";
import PureRender from "../../decorators/PureRender";
import { getInViewport, getViewPort } from "../../utils/viewport";

@PureRender
@storeComponent(AppStore)
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
    let node = ReactDOM.findDOMNode(this);
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
        <footer className="post-footer">
          {/*
            * { !(single) &&
            */}
            <ShareBox
              thumbnail={ thumbnail }
              post={ post } />
           {/*
             *}
             */}
            </footer>
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
    case "answer":
      return PostAnswer;
    case "audio":
      return PostAudio;
    default:
      console.warn(post.get("type"), "is unhandled.");
      return PostText;
  }
};
