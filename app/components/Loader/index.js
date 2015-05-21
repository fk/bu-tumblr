"use strict";

import React, { PropTypes } from "react";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="loader-root">
          { Array.from({ length: 18 }).map((_, i) => (
            <div
              key={ i }
              className="loader-bar" />
          )) }
        </div>
      </div>
    );
  }
}
