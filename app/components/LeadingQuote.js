"use strict";

import React, { addons, PropTypes } from "react";

const { PureRenderMixin } = addons;

const LeadingQuote = React.createClass({
  render() {
    return (
      <div className="leading-quote">
        <p>We&apos;re here to chew bubblegum and kick ass,<br/>
        and we&apos;re all out of gum.<br/>
        _</p>
      </div>
    );
  }
});

export default LeadingQuote;
