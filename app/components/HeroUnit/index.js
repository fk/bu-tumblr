"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import warning from "react/lib/warning";
import { OrderedMap, Map } from "immutable";
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
            <div className="we-are">
              <h3>We are<br/>Brooklyn United</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed interdum lacus solliitudin feugiat pellen tesque.</p>
            </div>
            <nav className="hashtags">
              <h4>Search by hashtag</h4>
              <ul>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "people" }}>
                    #people
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "design" }}>
                    #design
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "strategy" }}>
                    #strategy
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "business" }}>
                    #business
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "technology" }}>
                    #technology
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "client services" }}>
                    #client services
                  </Link>
                </li>
                <li>
                  <Link
                    to="tag"
                    params={{ tagName: "random" }}>
                    #random
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hero-unit-post">
            <Post
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
