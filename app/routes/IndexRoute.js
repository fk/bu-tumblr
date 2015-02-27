"use strict";

import React from "react/addons";
import Posts from "../components/Posts";

var { PureRenderMixin } = React.addons;

var IndexRoute = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="index-route">
        <Posts />
      </div>
    );
  }
});

export default IndexRoute;
