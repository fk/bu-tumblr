"use strict";

import React from "react/addons";

const { PureRenderMixin } = React.addons;

let TagList = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <ul className="tag-list">

      </ul>
    );
  }
});

export default TagList;
