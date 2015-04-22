"use strict";

import React, { PropTypes } from "react/addons";
import DocumentTitle from "react-document-title";
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
        <title>{ DocumentTitle.rewind() }</title>
        <link href={fonts} rel="stylesheet" />
        { styles.map((href, key) => (
          <link
            key={ key }
            rel="stylesheet"
            href={ href } />
        )) }
        <script src="//use.typekit.net/iey8vjp.js"></script>
        <script dangerouslySetInnerHTML={{__html: TYPE_KIT_EXEC }} />
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

        <script dangerouslySetInnerHTML={{
          __html: `window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
              t._e.push(f);
            };

            return t;
          }(document, "script", "twitter-wjs"));`
        }} />
      </body>
      </html>
    );
  }
}
