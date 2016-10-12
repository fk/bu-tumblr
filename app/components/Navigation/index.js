"use strict";

import React from "react";
import AppActionCreators from "../../actions/AppActionCreators";
import AppStore from "../../stores/AppStore";
import { Link } from "react-router";
import storeComponent from "../../decorators/storeComponent";
import PureRender from "../../decorators/PureRender";
import Icon from "../Icons";

@PureRender
@storeComponent(AppStore)
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickClose = this.handleClickClose.bind(this);
  }

  static getStateFromStores(props) {
    let { app } = AppStore.getState();

    return { app };
  }

  handleClickClose(event) {
    event.stopPropagation();

    AppActionCreators.toggleNavigation();
  }

  render() {
    let { app } = this.props;
    let { homeUrl } = app.toJS();

    return (
      <div className="navigation">
        <nav className="external">
          <a href={`${homeUrl}/about`}>
            <h2>About</h2>
          </a>
          <a href={`${homeUrl}/archive`}>
            <h2>Archive</h2>
          </a>
        </nav>
        <nav className="hashtags">
          <Link
              to="tag"
              params={{ tagName: "graffiti" }}
              onClick={ this.handleClickClose }>
            #graffiti
          </Link>
          <Link
              to="tag"
              params={{ tagName: "music" }}
              onClick={ this.handleClickClose }>
            #music
          </Link>
          <Link
              to="tag"
              params={{ tagName: "personal" }}
              onClick={ this.handleClickClose }>
            #personal
          </Link>
          <Link
              to="tag"
              params={{ tagName: "masonite" }}
              onClick={ this.handleClickClose }>
            #masonite
          </Link>
          <Link
              to="tag"
              params={{ tagName: "masonite debug" }}
              onClick={ this.handleClickClose }>
            #masonite debug
          </Link>
        </nav>
      </div>
    );
  }
}
