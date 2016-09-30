"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class Spinner extends React.Component {
  render() {
    let cx = classNames(["spinner-container", this.props.className]);

    return (
        <div className={cx}>
          <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        </div>
    );
  }
}
