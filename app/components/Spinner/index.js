"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class Spinner extends React.Component {
  render() {
    let cx = classNames(["spinner-container", this.props.className]);

    return (
      <div className={ cx }>
        <div className="spinner" />
      </div>
    );
  }
}
