"use strict";

import React, { PropTypes } from "react";
import Icon from "../Icons";
import classNames from "classnames";

class BackButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.func
  }

  handleClick(event) {
    let { router } = this.context;

    event.preventDefault();

    if (!router.goBack()) {
      router.transitionTo("/");
    }
  }

  render() {
    let { router } = this.context;
    let cx = classNames(["back-btn", {
      "is-hidden": (router.getLocation().getCurrentPath() === "/")
    }]);

    return (
      <button
        onClick={ this.handleClick }
        type="button"
        className={cx}>
        <h5>
          <Icon icon="arrow-back" />
        </h5>
      </button>
    );
  }
}

export default BackButton;
