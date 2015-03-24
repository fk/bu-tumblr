"use strict";

import React, { PropTypes } from "react";

const { PureRenderMixin } = React.addons;

export default class LeadingQuote extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="leading-quote">
        <p>We&apos;re here to chew bubblegum and kick ass,<br/>
        and we&apos;re all out of gum.<br/>
        _</p>
      </div>
    );
  }
};
