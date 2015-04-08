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
import PureRender from "../../decorators/PureRender";
import StoreComponent from "../../decorators/StoreComponent";
import { getViewport } from "../../utils/viewport";

const { CSSTransitionGroup } = React.addons;

@PureRender
@StoreComponent(AppStore, LightboxStore)
export default class App extends React.Component {
  static propTypes = { env: PropTypes.string }

  static defaultProps = { env: "development" }

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

    const cx = classNames("app", {
      "fixed-header": fixedHeader,
      "navigation-open": navOpen
    });

    return (
      <div className={ cx }>
        <div className="container">
          <Header />
          <CSSTransitionGroup
            component="div"
            transitionName="route">
            <RouteHandler key={ this.context.router.getCurrentPath() } />
          </CSSTransitionGroup>
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
      </div>
    );
  }
}
