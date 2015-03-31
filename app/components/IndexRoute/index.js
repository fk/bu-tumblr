"use strict";

import React from "react/addons";
import Posts from "../Posts";
import HeroUnit from "../HeroUnit";
import LeadingQuote from "../LeadingQuote";
import PostActionCreators from "../../actions/PostActionCreators";
import PostStore from "../../stores/PostStore";
import storeComponent from "../../utils/storeComponent";

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
  let { posts } = PostStore.getState();

  posts = posts.sort((a, b) => a.get("id") < b.get("id") ? 1 : -1);

  return { posts };
};

export default storeComponent(IndexRoute, [PostStore], getState);
