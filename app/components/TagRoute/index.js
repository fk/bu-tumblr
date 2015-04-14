import React, { PropTypes } from "react";
import Posts from "../Posts";
import PostActionCreators from "../../actions/PostActionCreators";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import StoreComponent from "../../decorators/StoreComponent";
import InfiniteComponent from "../../decorators/InfiniteComponent";
import PureRender from "../../decorators/PureRender";

@PureRender
@StoreComponent(PostStore, RouterStore)
@InfiniteComponent
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
      tagName: tagName
    });
  }

  static getStateFromStores(params) {

  }

  render() {
    return (
      <div className="tag-route">

      </div>
    );
  }
}
