"use strict";

import React, { PropTypes } from "react";
import { Map } from "immutable";
import Post from "../Post";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class HeroUnit extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    post(props, propName, component) {
      return Map.isMap(props);
    }
  }

  render() {
    const { post } = this.props;

    return (
      <div className="hero-unit">
        <div className="hero-wrapper">
          <div
            ref={ c => this._intro = c }
            className="intro">
          </div>
          <div className="hero-unit-post">
            <Post
              condensed={ true }
              post={ post } />
          </div>
        </div>
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
}
