"use strict";

import React from "react";
import Router from "react-router";
import serialize from "serialize-javascript";
import alt from "../alt";
import HTMLDocument from "./HTMLDocument";

let routes;

export default function render() {
  const doctype = "<!doctype html>\n";

  if (process.env.NODE_ENV === "production") {
    routes = require("../routes");
  }

  return function *(next) {
    let { url } = this.req;
    let router = createRouter(url);
    let { Handler, state } = yield getResolvedRoute(router);
    let markup = React.renderToString(<Handler { ...state } />);
    let appState = serialize(alt.flush());

    // let html = React.renderToStaticMarkup(
    //   <HTMLDocument
    //     { ...state }
    //     markup={ markup }
    //     appState={ appState } />
    // );

    // this.body = doctype + html;
  };
};


const onAbort = (aborted) => {
  let { to, params, query } = aborted;
  let url = Router.makePath(to, params, query);

  this.redirect(url);
};

const createRouter = (location = "") => {
  if (process.env.NODE_ENV !== "production") {
    routes = require("../routes");
    delete require.cache[require.resolve("../routes")];
  }

  return Router.create({ location, onAbort, routes });
};

const getState = (router) => {
  return new Promise((resolve, reject) => {
    try {
      router.run((Handler, state) => resolve({ Handler, state }));
    }
    catch (err) {
      reject(err);
    }
  });
};

const getResolvedRoute = (router) => {
  return new Promise((resolve, reject) => {
    try {
      router.run((Handler, state) => {
        resolve({ Handler, state });
      });
    }
    catch (err) {
      reject(err);
    }
  });
};
