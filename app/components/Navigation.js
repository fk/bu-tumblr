"use strict";

import React from "react/addons";
import AppActionCreators from "../actions/AppActionCreators";

var { PureRenderMixin } = React.addons;

var Navigation = React.createClass({
  mixins: [PureRenderMixin],

  handleClickClose(event) {
    event.preventDefault();

    AppActionCreators.toggleNavigation();
  },

  render() {
    return (
      <div className="navigation">
        <button
          className="close-btn"
          type="button"
          children="Close"
          onClick={this.handleClickClose} />

      </div>
    );
  }
});

export default Navigation;
