"use strict";

import React, { PropTypes } from "react/addons";

class PostVideo extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={ className } />
    );
  }
}

export default PostVideo;
