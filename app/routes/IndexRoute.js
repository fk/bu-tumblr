"use strict";

import React from "react/addons";
import PostStore from "../stores/PostStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import PostActionCreators from "../actions/PostActionCreators";

var { PureRenderMixin } = React.addons;

var IndexRoute = React.createClass({
  mixins: [PureRenderMixin, ListenerMixin],

  statics: {
    fetchData() {
      return PostActionCreators.getPosts();
    }
  },

  getInitialState() {

  },

  componentWillMount() {
    this.listenTo(PostStore, () => {
      this.setState(this.getInitialState());
    });
  },

  render() {
    return (
      <div className="index-route">

      </div>
    );
  }
});

export default IndexRoute;
