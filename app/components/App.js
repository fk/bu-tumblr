"use strict";

import React, { PropTypes } from "react/addons";
import { RouteHandler } from "react-router";
import classNames from "classnames";
import Header from "./Header";
import Navigation from "./Navigation";
import AppStore from "../stores/AppStore";
import storeComponent from "../utils/storeComponent";
import AppActionCreators from "../actions/AppActionCreators";

const { PureRenderMixin, CSSTransitionGroup } = React.addons;

const getState = (props) => {
  let { app } = AppStore.getState();

  return { app };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateScrollState = this.updateScrollState.bind(this);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.updateScrollState, false);
    document.addEventListener("resize", this.updateScrollState, false);
  }

  updateScrollState(event) {
    let dY = window.pageYOffset !== undefined ?
      window.pageYOffset :
      (
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;

    AppActionCreators.setScrollState(dY);
  }

  render() {
    const { env, app } = this.props;
    const { fixedHeader, navOpen } = app.toJS();
    const css = env === "production" ? "app.min" : "app";
    const bundle = env === "production" ?
      "/bundle.min" : "http://localhost:9000/dist/bundle";

    const cx = classNames({
      "fixed-header": fixedHeader,
      "navigation-open": navOpen
    });

    const fonts = "http://fonts.googleapis.com/css?family=Montserrat:700";
    const TYPE_KIT_EXEC = "try{Typekit.load();}catch(e){}";

    return (
      <html lang="en">
      <head>
        <title>Brooklyn United</title>
        <script src="//use.typekit.net/iey8vjp.js"></script>
        <script dangerouslySetInnerHTML={{__html: TYPE_KIT_EXEC }} />
        <link href={fonts} rel="stylesheet" />
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
};

App.propTypes = { env: PropTypes.string };
App.defaultProps = { env: "development" };

export default storeComponent(App, [AppStore], getState);
