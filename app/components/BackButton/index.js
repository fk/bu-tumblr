"use strict";

import React, { PropTypes } from "react/addons";
import Router from "react-router";

const { PureRenderMixin } = React.addons;

class BackButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.func
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  handleClick(event) {
    let { router } = this.context;

    event.preventDefault();

    if (!router.goBack()) {
      router.transitionTo("/");
    }
  }

  render() {
    return (
      <button
        onClick={ this.handleClick }
        type="button"
        className="back-button">
        <h5><i className="fa fa-chevron-left" /> Back</h5>
      </button>
    );
  }
}

export default BackButton;
