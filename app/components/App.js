"use strict";

import React from "react/addons";
import {RouteHandler} from "react-router";

var App = React.createClass({
  render() {
    return (
      <html lang="en">
      <head>
        <title>Brooklyn United</title>
      </head>
      <body>
        <h1>Test</h1>
        <RouteHandler />
      </body>
      </html>
    );
  }
});

export default App;
