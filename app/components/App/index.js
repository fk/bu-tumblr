"use strict";

import React, { PropTypes } from "react/addons";
import { RouteHandler } from "react-router";
import classNames from "classnames";
import Header from "../Header";
import Footer from "../Footer";
import Navigation from "../Navigation";
import Lightbox from "../Lightbox";
import AppActionCreators from "../../actions/AppActionCreators";
import AppStore from "../../stores/AppStore";
import LightboxStore from "../../stores/LightboxStore";
import storeComponent from "../../utils/storeComponent";
import { getViewport } from "../../utils/viewport";
import PureRender from "../../decorators/PureRender";
import StoreComponent from "../../decorators/StoreComponent";

const { CSSTransitionGroup } = React.addons;
const getStateFromStores = (props) => {
  let { app } = AppStore.getState();
  let { lightbox } = LightboxStore.getState();

  return { app, lightbox };
};


@PureRender
class App extends React.Component {
  static propTypes = { env: PropTypes.string }

  static defaultProps = { env: "development" }

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
        <Footer />
      </body>
      </html>
    );
  }
}

const getState = (props) => {
  let { app } = AppStore.getState();
  let { lightbox } = LightboxStore.getState();

  return { app, lightbox };
};

export default storeComponent(App, [AppStore, LightboxStore], getState);
