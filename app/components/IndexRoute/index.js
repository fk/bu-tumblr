"use strict";

import React from "react/addons";
import Posts from "../Posts";
import HeroUnit from "../HeroUnit";
import LeadingQuote from "../LeadingQuote";
import PostActionCreators from "../../actions/PostActionCreators";
import PostStore from "../../stores/PostStore";
import StoreComponent from "../../decorators/StoreComponent";
import InfiniteComponent from "../../decorators/InfiniteComponent";
import PureRender from "../../decorators/PureRender";

@PureRender
@InfiniteComponent
@StoreComponent(PostStore)
export default class IndexRoute extends React.Component {
  static async fetchData() {
    return await PostActionCreators.getPosts();
  }

  static async onInfiniteScroll(params) {
    const { page, itemsPerPage } = params;

    return PostActionCreators.getPosts({
      offset: page * itemsPerPage
    });
  }

  static getStateFromStores(props) {
    let { posts } = PostStore.getState();
    posts = posts.sort((a, b) => a.get("id") < b.get("id") ? 1 : -1);
    return { posts };
  }

  componentWillReceiveProps(nextProps, nextState) {
    let { viewport } = nextProps;
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
