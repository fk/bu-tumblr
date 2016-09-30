"use strict";

import React, { PropTypes } from "react";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class LeadingQuote extends React.Component {
  render() {
    return (
      <div className="leading-quote">
          aka Masonite x Tumblr API x React
      </div>
    );
  }
}
