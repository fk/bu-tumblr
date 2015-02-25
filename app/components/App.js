"use strict";

import React from "react/addons";
import {RouteHandler} from "react-router";

var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var App = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    env: PropTypes.string
  },

  getDefaultProps() {
    return { env: 'development' };
  },

  render() {
    let { env } = this.props;
    let css = env === 'production' ? 'app.min' : 'app';
    let bundle = env === 'production' ?
      '/bundle.min' : 'http://localhost:9000/dist/bundle';

    return (
      <html lang="en">
      <head>
        <title>Brooklyn United</title>
        <link rel="stylesheet" href={`/stylesheets/${css}.css`} />
      </head>
      <body>
        <h1>Test</h1>
        <RouteHandler />
        <script src={`${bundle}.js`} />
      </body>
      </html>
    );
  }
});

export default App;
