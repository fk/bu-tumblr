"use strict";

import Post from "./Post";
import { Link } from "react-router";
import warning from "react/lib/warning";
import { OrderedMap, Map } from "immutable";
import React, { PropTypes } from "react";

const { PureRenderMixin } = React.addons;

export default class HeroUnit extends React.Component {
  constructor(props) {
    super(props);

    this.onResize = this.onResize.bind(this);
    this.state = { width: 0 };
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
    const heroNode = React.findDOMNode(this);
    const introNode = React.findDOMNode(this._intro);
    let totalWidth = heroNode.clientWidth;
    let introWidth = introNode.clientWidth;

    let width = totalWidth - introWidth;

    this.setState({ width: width - 30 });
  }

  render() {
    const { post } = this.props;
    const { width } = this.state;

    return (
      <div className="hero-unit">
        <div
          ref={ c => this._intro = c }
          className="intro">
          <div className="we-are">
            <h3>We are<br/>Brooklyn United</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed interdum lacus solliitudin feugiat pellen tesque.</p>
          </div>
          <nav className="hashtags">
            <h4>Search by hashtag</h4>
            <ul>
              <li><Link to="/">#people</Link></li>
              <li><Link to="/">#design</Link></li>
              <li><Link to="/">#strategy</Link></li>
              <li><Link to="/">#business</Link></li>
              <li><Link to="/">#technology</Link></li>
              <li><Link to="/">#client services</Link></li>
              <li><Link to="/">#random</Link></li>
            </ul>
          </nav>
        </div>
        <Post
          post={ post }
          width={ width } />
        <svg
          viewBox="0 0 100 100"
          className="backer"
          preserveAspectRatio="none">
          <g>
            <path d="M0,0 L100,0 L100,100 L0,80" />
          </g>
        </svg>
      </div>
    );
  }
};

HeroUnit.propTypes = {
  post(props, propName, component) {
    return Map.isMap(props);
  }
};
