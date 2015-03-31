"use strict";

import React from "react/addons";
import Posts from "../components/Posts";
import PostStore from "../stores/PostStore";
import HeroUnit from "../components/HeroUnit";
import LeadingQuote from "../components/LeadingQuote";
import PostActionCreators from "../actions/PostActionCreators";
import storeComponent from "../utils/storeComponent";

const { PureRenderMixin } = React.addons;

class IndexRoute extends React.Component {
  static async fetchData() {
    return await PostActionCreators.getPosts();
  }

  render() {
    let postsArr = this.props.posts.toList();
    let leadingPost = postsArr.first();
    let posts = postsArr.shift();

    return (
      <div className="index-route">
        <LeadingQuote />
        <HeroUnit post={ leadingPost } />
        <Posts posts={ posts } />
      </div>
    );
  }
};

const getState = () => {
  const { posts } = PostStore.getState();

  return { posts };
};

export default storeComponent(IndexRoute, [PostStore], getState);
