"use strict";

import Post from "./Post";
import React from "react/addons";
import PostStore from "../stores/PostStore";
import ListenerMixin from "alt/mixins/ListenerMixin";
import PostActionCreators from "../actions/PostActionCreators";

var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Posts = React.createClass({
  mixins: [ListenerMixin, PureRenderMixin],

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
    this.listenTo(PostStore, this.onStoreChange);
  },

  onStoreChange() {
    if (this.isMounted()) {
      this.setState(this.getInitialState());
    }
  },

  render() {
    let { posts: rawPosts } = this.state;
    let posts = [];

    for (let [id, post] of rawPosts.entries()) {
      posts.push(<Post key={ id } post={ post } />);
    }

    return (
      <div className="posts">
        {posts}
      </div>
    );
  }
});

export default Posts;
