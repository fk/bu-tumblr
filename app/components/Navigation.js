"use strict";

import React from "react/addons";
import AppStore from "../stores/AppStore";
import AppActionCreators from "../actions/AppActionCreators";
import ReactStateMagicMixin from "alt/mixins/ReactStateMagicMixin";

var { PureRenderMixin, CSSTransitionGroup } = React.addons;

var Navigation = React.createClass({
  mixins: [PureRenderMixin, ReactStateMagicMixin],

  statics: {
    registerStore: AppStore
  },

  handleClickClose(event) {
    event.preventDefault();

    AppActionCreators.toggleNavigation();
  },

  render() {
    let { app } = this.state;
    let { homeUrl } = app.toJS();

    return (
      <div className="navigation">
        <a className="logo" href={homeUrl}>
          <h1>Brooklyn<br/>United</h1>
        </a>
        <button
          className="close-btn"
          type="button"
          children="Close"
          onClick={this.handleClickClose} />
        <nav>
          <a href={`${homeUrl}`}>
            <h2>Home<span className="highlight">Home</span></h2>
          </a>
          <a href={`${homeUrl}/approach`}>
            <h2>Approach<span className="highlight">Approach</span></h2>
          </a>
          <a href={`${homeUrl}/work`}>
            <h2>Work<span className="highlight">Work</span></h2>
          </a>
          <a href={`${homeUrl}/people`}>
            <h2>People<span className="highlight">People</span></h2>
          </a>
        </nav>
      </div>
    );
  }
});

export default Navigation;
