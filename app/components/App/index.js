"use strict";

import React, { PropTypes } from "react/addons";
import { RouteHandler } from "react-router";
import classNames from "classnames";
import Header from "../Header";
import Navigation from "../Navigation";
import Lightbox from "../Lightbox";
import AppActionCreators from "../../actions/AppActionCreators";
import AppStore from "../../stores/AppStore";
import LightboxStore from "../../stores/LightboxStore";
import storeComponent from "../../utils/storeComponent";

const { PureRenderMixin, CSSTransitionGroup } = React.addons;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateScrollState = this.updateScrollState.bind(this);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.updateScrollState, false);
    document.addEventListener("resize", this.updateScrollState, false);
    this.updateScrollState();
  }

  updateScrollState(event) {
    AppActionCreators.setScrollState(getViewport());
  }

  render() {
    const { env, app, lightbox } = this.props;
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
        { lightbox.get("photos").size > 0 &&
          <Lightbox
            photos={ lightbox.get("photos") }
            index={ lightbox.get("index")} />
        }
      </body>
      </html>
    );
  }
}

App.propTypes = { env: PropTypes.string };
App.defaultProps = { env: "development" };

const getState = (props) => {
  let { app } = AppStore.getState();
  let { lightbox } = LightboxStore.getState();

  return { app, lightbox };
};

const getViewport = () => {
  let y = window.pageYOffset !== undefined ?
    window.pageYOffset :
    (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop;

  let x = window.pageXOffset !== undefined ?
    window.pageYOffset :
    (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollLeft;

    var w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    var h = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    return { x, y, w, h };
};

export default storeComponent(App, [AppStore, LightboxStore], getState);
