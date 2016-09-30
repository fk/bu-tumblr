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
          viewBox="0 0 120 20">
          <g>
            <path d="M10.9,13c4.9,0,4.9-6,9.8-6c4.9,0,4.9,6,9.8,6c4.9,0,4.9-6,9.8-6c4.9,0,4.9,6,9.8,6c4.9,0,4.9-6,9.8-6 c4.9,0,4.9,6,9.8,6c4.9,0,4.9-6,9.8-6c4.9,0,4.9,6,9.8,6c4.9,0,4.9-6,9.8-6s4.9,6,9.8,6"/>
          </g>
        </svg>
      </div>
    );
  }
}
