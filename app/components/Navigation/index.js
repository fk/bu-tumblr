"use strict";

import React from "react";
import AppActionCreators from "../../actions/AppActionCreators";
import AppStore from "../../stores/AppStore";
import StoreComponent from "../../decorators/StoreComponent";
import PureRender from "../../decorators/PureRender";

const { CSSTransitionGroup } = React.addons;

@PureRender
@StoreComponent(AppStore)
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
    event.preventDefault();

    AppActionCreators.toggleNavigation();
  }

  render() {
    let { app } = this.props;
    let { homeUrl } = app.toJS();

    return (
      <div className="navigation">
        <a className="logo" href={homeUrl}>
          <h1>Brooklyn<br/>United</h1>
        </a>
        <button
          className="close-btn"
          type="button"
          children="Close"
          onClick={this.handleClickClose} />
        <nav>
          <a href={`${homeUrl}/work`}>
            <h2>Work<span className="highlight">Work</span></h2>
          </a>
          <a href={`${homeUrl}/services`}>
            <h2>Services<span className="highlight">Services</span></h2>
          </a>
          <a href={`${homeUrl}/people`}>
            <h2>People<span className="highlight">People</span></h2>
          </a>
          <a href={`${homeUrl}/careers`}>
            <h2>Careers<span className="highlight">Careers</span></h2>
          </a>
          <a href="http://blog.brooklynunited.com">
            <h2>Blog<span className="highlight">Blog</span></h2>
          </a>
        </nav>
      </div>
    );
  }
}
