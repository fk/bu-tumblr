"use strict";

import React from "react";
import classNames from "classnames";
import AppStore from "../../stores/AppStore";
import AppActionCreators from "../../actions/AppActionCreators";
import storeComponent from "../../decorators/storeComponent";
import PureRender from "../../decorators/PureRender";
import { Link } from "react-router";
import BackButton from "../BackButton";
import Icon from "../Icons";

@PureRender
@storeComponent(AppStore)
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavToggle = this.handleNavToggle.bind(this);
  }

  static getStateFromStores(props) {
    let { app } = AppStore.getState();

    return { app };
  }

  handleNavToggle(event) {
    event.preventDefault();
    AppActionCreators.toggleNavigation();
  }

  render() {
    const { app } = this.props;
    const { homeUrl, fixedHeader } = app.toJS();

    const cx = classNames({
      "header": true,
      "fixed": fixedHeader
    });

    return (
      <header className={ cx }>
        <BackButton />
        <Link
          to="/"
          className="logo"
          href={ homeUrl }>
          <h1>Gabion<br />Alpha</h1>
        </Link>
        <button
          className="menu-btn"
          onClick={ this.handleNavToggle }>
          <div className="hamburger"></div>
        </button>
      </header>
    );
  }
}
