"use strict";

import React from "react/addons";

var { PureRenderMixin } = React.addons;

var IndexRoute = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="index-route">
        <h2>Index Route</h2>
      </div>
    );
  }
});

export default IndexRoute;
