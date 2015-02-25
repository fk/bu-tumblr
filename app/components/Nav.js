"use strict";

import React from "react/addons";

var { PureRenderMixin } = React.addons;

var Nav = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <nav className="nav">

      </nav>
    );
  }
});

export default Nav;
