"use strict";

import React from "react/addons";

const { PropTypes } = React;
const { PureRenderMixin } = React.addons;

let TagList = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    tags: PropTypes.arrayOf(PropTypes.string)
  },

  render() {
    let { tags } = this.props;

    return (
      <ul className="tag-list">
        { tags.map((tag, key) => <li key={ key }>{ tag }</li>) }
      </ul>
    );
  }
});

export default TagList;
