"use strict";

import React, { PropTypes } from "react";
import { RouteHandler } from "react-router";
import classNames from "classnames";
import Header from "../Header";
import Footer from "../Footer";
import Spinner from "../Spinner";
import Navigation from "../Navigation";
import Lightbox from "../Lightbox";
import AppActionCreators from "../../actions/AppActionCreators";
import AppStore from "../../stores/AppStore";
import LightboxStore from "../../stores/LightboxStore";
import PureRender from "../../decorators/PureRender";
import storeComponent from "../../decorators/storeComponent";
import { getViewport } from "../../utils/viewport";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

@PureRender
@storeComponent(AppStore, LightboxStore)
export default class App extends React.Component {
  static getStateFromStores(props) {
    let { app } = AppStore.getState();
    let { lightbox } = LightboxStore.getState();

    return { app, lightbox };
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
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
    const { app, lightbox } = this.props;
    const { fixedHeader, navOpen } = app.toJS();
    const name = this.context.router.getCurrentPath();
    const cx = classNames("app", {
      "fixed-header": fixedHeader,
      "navigation-open": navOpen || lightbox.get("photos").size > 0
    });

    return (
      <div className={ cx }>
        <div className="container">
          <Header />
          <RouteHandler name={ name } />
        </div>
        <ReactCSSTransitionGroup
            transitionName="navigation"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}>
          { navOpen &&
            <Navigation key="nav" />
          }
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
            transitionName="lightbox"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}>
          { lightbox.get("photos").size > 0 &&
            <Lightbox
              photos={ lightbox.get("photos") }
              index={ lightbox.get("index")} />
          }
        </ReactCSSTransitionGroup>
        <Footer />
        { /* <Spinner /> */ }
      </div>
    );
  }
}
