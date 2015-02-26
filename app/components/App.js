"use strict";

import Header from "./Header";
import React from "react/addons";
import Navigation from "./Navigation";
import {RouteHandler} from "react-router";
import AppStore from "../stores/AppStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import AppActionCreators from "../actions/AppActionCreators";

var { PropTypes } = React;
var { PureRenderMixin, classSet, CSSTransitionGroup } = React.addons;

var App = React.createClass({
  mixins: [PureRenderMixin, ListenerMixin],

  propTypes: {
    env: PropTypes.string
  },

  getInitialState() {
    let { app } = AppStore.getState();

    return { app };
  },

  getDefaultProps() {
    return { env: 'development' };
  },

  componentWillMount() {
    this.listenTo(AppStore, () => {
      this.setState(this.getInitialState());
    });
  },

  componentDidMount() {
    document.addEventListener('scroll', this.updateScrollState, false);
    document.addEventListener('resize', this.updateScrollState, false);
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
    const css = env === 'production' ? 'app.min' : 'app';
    const bundle = env === 'production' ?
      '/bundle.min' : 'http://localhost:9000/dist/bundle';
    const { app } = this.state;
    const { fixedHeader, navOpen } = app.toJS();

    const cx = classSet({
      'fixed-header': fixedHeader,
      'navigation-open': navOpen
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
