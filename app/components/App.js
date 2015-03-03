"use strict";

import Header from "./Header";
import React from "react/addons";
import Navigation from "./Navigation";
import classNames from "classnames";
import {RouteHandler} from "react-router";
import AppStore from "../stores/AppStore";
import AppActionCreators from "../actions/AppActionCreators";
import ReactStateMagicMixin from "alt/mixins/ReactStateMagicMixin";

var { PropTypes } = React;
var { PureRenderMixin, CSSTransitionGroup } = React.addons;

var App = React.createClass({
  mixins: [PureRenderMixin, ReactStateMagicMixin],

  statics: {
    registerStore: AppStore
  },

  propTypes: {
    env: PropTypes.string
  },

  getDefaultProps() {
    return { env: "development" };
  },

  componentDidMount() {
    document.addEventListener("scroll", this.updateScrollState, false);
    document.addEventListener("resize", this.updateScrollState, false);
  },

  updateScrollState(event) {
    let dY = window.pageYOffset !== undefined ?
      window.pageYOffset :
      (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;

    AppActionCreators.setScrollState(dY);
  },

  render() {
    const { env } = this.props;
    const css = env === "production" ? "app.min" : "app";
    const bundle = env === "production" ?
      "/bundle.min" : "http://localhost:9000/dist/bundle";
    const { app } = this.state;
    const { fixedHeader, navOpen } = app.toJS();

    const cx = classNames({
      "fixed-header": fixedHeader,
      "navigation-open": navOpen
    });

    return (
      <html lang="en">
      <head>
        <title>Brooklyn United</title>
        <link href="http://fonts.googleapis.com/css?family=Montserrat:700" rel="stylesheet" />
        <link rel="stylesheet" href={`/stylesheets/${css}.css`} />
      </head>
      <body className={cx}>
        <div className="container">
          <Header />
          <RouteHandler />
        </div>
        <CSSTransitionGroup transitionName="navigation">
          { navOpen &&
            <Navigation key="nav" />
          }
        </CSSTransitionGroup>
      </body>
      </html>
    );
  }
});

export default App;
