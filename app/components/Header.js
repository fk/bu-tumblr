"use strict";

import React from "react/addons";

var { PureRenderMixin } = React.addons;

var Header = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps() {
    return { home: 'http://brooklynunited.com' };
  },

  render() {
    let { home } = this.props;

    return (
      <header className="header">
        <a className="logo item" href={ home }>
          <h1>Brooklyn<br/>United</h1>
        </a>
        <a className="gear item" href={ home }>
          <img src="/img/brooklyn-united-header-gear.gif" />
        </a>
        <button className="menu-btn item">
          Menu <img src="/img/menu-icon.png" />
        </button>
      </header>
    );
  }
});

export default Header;
