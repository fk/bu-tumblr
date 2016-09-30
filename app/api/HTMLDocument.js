"use strict";

import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import serialize from "serialize-javascript";

const env = process.env.NODE_ENV || "development";
const fonts = "//fonts.googleapis.com/css?family=Space+Mono:400i,700i";
const css = env !== "production" ?
  "/stylesheets/app.min.css" : "/stylesheets/app.css";

export default class App extends React.Component {
  render() {
    let {
      markup,
      payload,
      scripts,
      styles
    } = this.props;

    payload = `var payload = ${serialize(JSON.parse(payload))};`;

    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>{ DocumentTitle.rewind() }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta property="og:title" content="Gabion Alpha" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="hellodirty.com" />
        <meta property="og:image" content="www.xxxxxxxxx.jpg" />
        <meta property="og:site_name" content="gabion" />
        <meta property="og:description" content="Description." />
        <link href={fonts} rel="stylesheet" />
        { styles.map((href, key) => (
          <link
            key={ key }
            rel="stylesheet"
            href={ href } />
        )) }
        <script dangerouslySetInnerHTML={{ __html: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-20769653-1', 'auto');
          ga('require', 'displayfeatures');
          ga('require', 'linkid', 'linkid.js');
          ga('send', 'pageview');
        ` }} />
        <noscript>
          <iframe
            src="//www.googletagmanager.com/ns.html?id=GTM-P442P4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P442P4');
        ` }} />
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
