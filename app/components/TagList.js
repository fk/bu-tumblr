"use strict";

import React from "react/addons";

var { PureRenderMixin } = React.addons;

var TagList = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <ul className="tag-list">

      </ul>
    );
  }
});

export default TagList;
