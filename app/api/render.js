import http from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactRouter from "react-router";
import HTMLDocument from "./HTMLDocument";
import alt from "../alt";
import routes from "../routes";
import RouterActionCreators from "../actions/RouterActionCreators";
import PrettyError from "pretty-error";

class RedirectError extends Error {
  static TYPE = Symbol("redirect error")

  constructor(code, path) {
    super();
    this.code = code;
    this.path = path;
  }

  toString() {
    return RedirectError.TYPE;
  }

  getRedirect() {
    return {
      path: this.path,
      code: this.code
    };
  }
}

class NotFoundError extends Error {
  static type = Symbol("404 error")

  constructor() {
    super();
  }

  toString() {
    return NotFoundError.TYPE;
  }
}

export default () => {
  const doctype = "<!doctype html>";

  return function *(next) {
    let router = ReactRouter.create({
      location: this.req.url,
      routes: routes,
      onAbort: function(abortReason) {
        let { to, params, query } = abortReason;

        if (abortReason === 404) {
          throw new NotFoundError(abortReason);
        }
        else {
          let url = this.makePath(to, params, query);
          throw new RedirectError(401, url);
        }

      }
    });

    try {
      let [Handler, state] = yield new Promise((resolve, reject) => {
        try {
          router.run((...response) => {
            resolve(response);
          });
        }
        catch (err) {
          reject(err);
        }
      });

      RouterActionCreators.routeChange(state);

      yield new Promise((resolve, reject) => {
        try {
          let { routes } = state;
          let asyncData = routes.filter(route => route.handler.fetchData)
            .map(route => route.handler.fetchData(state.params, state.query));

          Promise.all(asyncData)
            .then(data => resolve(data))
            .catch(err => reject(err));
        }
        catch (err) {
          reject(err);
        }
      });

      let markup = ReactDOMServer.renderToString(
        <Handler { ...state } />
      );

      let html = ReactDOMServer.renderToStaticMarkup(
        <HTMLDocument
          markup={ markup }
          payload={ alt.flush() }
          styles={ [
            process.env.NODE_ENV === "production" ?
              "/stylesheets/app.min.css" : "/stylesheets/app.css"
          ] }
          scripts={ [
            process.env.NODE_ENV === "production" ?
              "/bundle.min.js" : "http://localhost:9000/dist/bundle.js"
          ] } />
      );

      this.body = doctype + html;
    }
    catch (err) {
      switch (err.toString()) {
        case RedirectError.TYPE:
          let {
            code,
            path
          } = err.getRedirect();

          this.redirect(code, path);
          break;
        case NotFoundError.TYPE:
          let notFoundHtml = yield new Promise((resolve, reject) => {
            http.get("http://hellodirty.com/404.html", res => {
              let body = "";
              res.on("data", chunk => body += chunk);
              res.on("end", () => {
                body = body.replace(
                  /(src|href)="(\/[A-z])/g,
                  "$1=\"http://www.hellodirty.com$2"
                );
                resolve(body);
              });
            });
          });

          this.body = notFoundHtml;
          this.status = 404;
          break;
        default:
          let pe = new PrettyError();
          console.log(pe.render(err));
          this.body = err.stack;
          break;
      }
    }
  };
};
