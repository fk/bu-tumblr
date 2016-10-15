"use strict";

import React, { PropTypes } from "react";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class Placeholder extends React.Component {
  render() {
    let { style } = this.props;

    return (
      <div className="lazyload-placeholder" style={ style }>
      </div>
    );
  }
}
