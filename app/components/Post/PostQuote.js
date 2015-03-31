"use strict";

import React, { PropTypes } from "react/addons";

class PostQuote extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={ className } />
    );
  }
}

export default PostQuote;
