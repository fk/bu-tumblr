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
        <a href={ home }>
          <h1>Brooklyn<br/>United</h1>
        </a>
        <a href={ home }>
          <img src="/img/brooklyn-united-header-gear.gif" />
        </a>
      </header>
    );
  }
});

export default Header;
