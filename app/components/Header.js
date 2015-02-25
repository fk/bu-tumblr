"use strict";

import React from "react/addons";
import AppStore from "../stores/AppStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import AppActionCreators from "../actions/AppActionCreators";

var { PureRenderMixin, classSet } = React.addons;

var Header = React.createClass({
  mixins: [PureRenderMixin, ListenerMixin],

  getInitialState() {
    let { app } = AppStore.getState();

    return { app };
  },

  componentWillMount() {
    this.listenTo(AppStore, () => {
      this.setState(this.getInitialState());
    });
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
      'header': true,
      'fixed': fixedHeader
    });

    return (
      <header className={cx}>
        <div
          className="masthead"
          style={{ backgroundColor: mastheadColor }}>
          <svg
            className="angle"
            width="80"
            height="80"
            viewBox="0 0 80 100"
            preserveAspectRatio="none">
            <g fill={mastheadColor}>
              <path d="M0,0 L80,0 L80,80" />
            </g>
          </svg>
        </div>
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
          Menu <img src="/img/menu-icon.png" />
        </button>
      </header>
    );
  }
});

export default Header;
