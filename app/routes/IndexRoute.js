"use strict";

import React from "react/addons";
import Posts from "../components/Posts";
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
    let { posts } = PostStore.getState();

    return { posts };
  },

  componentWillMount() {
    this.listenTo(PostStore, () => {
      this.setState(this.getInitialState());
    });
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
