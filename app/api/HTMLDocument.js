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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>{ DocumentTitle.rewind() }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta property="og:title" content="Brooklyn United" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="blog.brooklynunited.com" />
        <meta property="og:image" content="www.xxxxxxxxx.jpg" />
        <meta property="og:site_name" content="Blog - Brooklyn United" />
        <meta property="fb:admins" content="618382230" />
        <meta property="og:description" content="We’re a culture-led, results-driven digital agency. Don’t lose your job over not hiring us." />
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
        <script src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
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
