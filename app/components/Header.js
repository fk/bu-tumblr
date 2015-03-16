"use strict";

import React from "react/addons";
import AppStore from "../stores/AppStore";
import AppActionCreators from "../actions/AppActionCreators";
import ReactStateMagicMixin from "alt/mixins/ReactStateMagicMixin";

const { PureRenderMixin, classSet } = React.addons;

let Header = React.createClass({
  mixins: [PureRenderMixin, ReactStateMagicMixin],

  statics: {
    registerStore: AppStore
  },

  handleNavToggle(event) {
    event.preventDefault();
    AppActionCreators.toggleNavigation();
  },

  render() {
    const { home } = this.props;
    const { app } = this.state;
    const { mastheadColor, homeUrl, fixedHeader } = app.toJS();

    const cx = classSet({
      "header": true,
      "fixed": fixedHeader
    });

    return (
      <header className={cx}>
        <a
          className="logo item"
          href={ homeUrl }>
          <h1>Brooklyn<br/>United</h1>
        </a>
        <a
          className="gear item"
          href={ homeUrl }>
          <img src="/img/brooklyn-united-header-gear.gif" />
        </a>
        <button
          className="menu-btn item"
          onClick={this.handleNavToggle}>
          Menu
          <svg
            className="menu-icon"
            viewBox="0 0 16 12"
            preserveAspectRatio="none">
            <g className="line">
              <path d="M0,0 L16,0 L16,2 L0,2" />
            </g>
            <g className="line">
              <path d="M0,5 L16,5 L16,7 L0,7" />
            </g>
            <g className="line">
              <path d="M0,10 L16,10 L16,12 L0,12" />
            </g>
          </svg>
        </button>
      </header>
    );
  }
});
export default Header;
