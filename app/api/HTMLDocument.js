"use strict";

import React, { PropTypes } from "react/addons";
import serialize from "serialize-javascript";
import { RouteHandler } from "react-router";

const env = process.env.NODE_ENV || "development";
const css = env !== "production" ?
  "/stylesheets/app.min.css" : "/stylesheets/app.css";
const fonts = "http://fonts.googleapis.com/css?family=Montserrat:700";
const TYPE_KIT_EXEC = "try{Typekit.load();}catch(e){}";

export default class App extends React.Component {
  render() {
    let {
      markup,
      payload,
      scripts,
      styles
    } = this.props;

    payload = `var payload = ${serialize(payload)};`;

    return (
      <html lang="en">
      <head>
        <title>Brooklyn United</title>
        <script src="//use.typekit.net/iey8vjp.js"></script>
        <script dangerouslySetInnerHTML={{__html: TYPE_KIT_EXEC }} />
        <link href={fonts} rel="stylesheet" />
        { styles.map((href, key) => (
          <link
            key={ key }
            rel="stylesheet"
            href={ href } />
        )) }
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: markup }} />
        <script dangerouslySetInnerHTML={{ __html: payload }} />
        { scripts.map((src, key) => (
          <script
            key={ key }
            src={ src } />
        )) }
      </body>
      </html>
    );
  }
}
