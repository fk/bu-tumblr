"use strict";

import React from "react/addons";
import Posts from "../components/Posts";
import PostStore from "../stores/PostStore";
import HeroUnit from "../components/HeroUnit";
import LeadingQuote from "../components/LeadingQuote";
import PostActionCreators from "../actions/PostActionCreators";
import ReactStateMagicMixin from "alt/mixins/ReactStateMagicMixin";

const { PureRenderMixin } = React.addons;

let IndexRoute = React.createClass({
  mixins: [ReactStateMagicMixin, PureRenderMixin],

  statics: {
    async fetchData(state) {
      return await PostActionCreators.getPosts();
    },

    registerStore: PostStore
  },

  render() {
    let posts = this.state.posts.toList();

    return (
      <div className="index-route">
        <LeadingQuote />
        <HeroUnit />
        <Posts posts={ posts } />
      </div>
    );
  }
});

export default IndexRoute;
