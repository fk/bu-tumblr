"use strict";

import React from "react";

export default class Backer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="backer">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 100 100">
          <g>
            <path d="M0,0 L0,100 L100,100" />
          </g>
        </svg>
      </div>
    );
  }
}
