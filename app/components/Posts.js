"use strict";

import Post from "./Post";
import React, { PropTypes } from "react/addons";

const { PureRenderMixin } = React.addons;

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { width: 0 };

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  onResize(event) {
    const node = React.findDOMNode(this);
    const width = node.clientWidth;

    this.setState({ width });
  }

  render() {
    let { posts } = this.props;
    let { width } = this.state;

    return (
      <div className="posts">
        { posts.map((post, key) => {
          return (
            <Post
              key={ key }
              width={ width }
              post={ post } />
          );
        }) }
      </div>
    );
  }
};
