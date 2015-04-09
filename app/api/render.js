import React from "react";
import ReactRouter from "react-router";
import HTMLDocument from "./HTMLDocument";
import alt from "../alt";
import routes from "../routes";
import RouterActionCreators from "../actions/RouterActionCreators";

class RedirectError extends Error {
  TYPE = Symbol("redirect error")

  constructor(code, path) {
    super();
    this.code = code;
    this.path = path;
  }

  toString() {
    return this.prototype.constructor.TYPE;
  }

  getRedirect() {
    return {
      path: this.path,
      code: this.code
    };
  }
}

export default () => {
  const doctype = "<!doctype html>";

  return function *(next) {
    let router = ReactRouter.create({
      location: this.req.url,
      routes: routes,
      onAbort: function({ to, params, query }) {
        let url = router.makeUrl(to, params, query);

        throw new RedirectError(401, url);
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

      let data = yield new Promise((resolve, reject) => {
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

      let markup = React.renderToString(
        <Handler { ...state } />
      );

      let html = React.renderToStaticMarkup(
        <HTMLDocument
          markup={ markup }
          payload={ alt.flush() }
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
        default:
          console.log(err.stack);
          this.body = err.stack;
          break;
      }
    }
  };
};
