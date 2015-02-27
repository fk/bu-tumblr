"use strict";

import React from "react/addons";
import Posts from "../components/Posts";
import PostStore from "../stores/PostStore";
import PostActionCreators from "../actions/PostActionCreators";
import ReactStateMagicMixin from "alt/mixins/ReactStateMagicMixin";

var { PureRenderMixin } = React.addons;

var IndexRoute = React.createClass({
  mixins: [ReactStateMagicMixin, PureRenderMixin],

  statics: {
    fetchData() {
      return PostActionCreators.getPosts();
    },

    registerStore: PostStore
  },

  render() {
    let { posts } = this.state;

    return (
      <div className="index-route">
        <Posts posts={ posts } />
      </div>
    );
  }
});

export default IndexRoute;
