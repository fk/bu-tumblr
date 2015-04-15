"use strict";

import React, { PropTypes } from "react";
import PureRender from "../../decorators/PureRender";

@PureRender
export default class LeadingQuote extends React.Component {
  render() {
    return (
      <div className="leading-quote">
        <p>We&apos;re here to chew bubblegum and kick ass,<br/>
        and we&apos;re all out of gum.<br/>
        _</p>
      </div>
    );
  }
}
