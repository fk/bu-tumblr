import React, { PropTypes } from "react";

export default class RouteNotFound extends React.Component {
  static willTransitionTo(transition, params) {
    transition.abort(404);
  }

  render() {
    return (
      <div className="route-not-found" />
    );
  }
}
