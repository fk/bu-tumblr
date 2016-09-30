"use strict";

import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import Posts from "../Posts";
import Backer from "../Backer";
import PostActionCreators from "../../actions/PostActionCreators";
import AppStore from "../../stores/AppStore";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import storeComponent from "../../decorators/storeComponent";
import InfiniteComponent from "../../decorators/InfiniteComponent";
import PureRender from "../../decorators/PureRender";

@PureRender
@InfiniteComponent
@storeComponent(PostStore, RouterStore)
export default class TagRoute extends React.Component {
  static async fetchData(params, query) {
    return await PostActionCreators.getPostsByTagName(params.tagName);
  }

  static onInfiniteScroll(params) {
    let { router } = RouterStore.getState();
    let tagName = router.getIn(["params", "tagName"]);

    const {
      page,
      itemsPerPage
    } = params;

    return PostActionCreators.getPosts({
      offset: page * itemsPerPage,
      tag: tagName
    });
  }

  static getStateFromStores(params) {
    let { app } = AppStore.getState();
    let { router } = RouterStore.getState();
    let tagName = router.getIn(["params", "tagName"]);
    let posts = PostStore.getPostsByTagName(tagName);

    posts = posts.sort((a, b) => a.get("id") < b.get("id") ? 1 : -1);

    return { posts, router, app };
  }

  render() {
    let { posts } = this.props;
    let tagName = this.props.router.getIn(["params", "tagName"]);
    let title = this.props.app.get("title");

    return (
      <DocumentTitle title={ `Tag \"${tagName}\" - ${title}` }>
        <div className="tag-route">
          <Backer />
          <span className="tag-title">Posts tagged {tagName}</span>
          <Posts posts={ posts } />
        </div>
      </DocumentTitle>
    );
  }
}
