import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import Posts from "../Posts";
import Backer from "../Backer";
import BackButton from "../BackButton";
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
    let { router } = RouterStore.getState();
    let tagName = router.getIn(["params", "tagName"]);
    let posts = PostStore.getPostsByTagName(tagName);

    posts = posts.sort((a, b) => a.get("id") < b.get("id") ? 1 : -1);

    return { posts, router };
  }

  render() {
    let { posts } = this.props;
    let tagName = this.props.router.getIn(["params", "tagName"]);

    return (
      <DocumentTitle title={ `Tag \`${tagName}\` - Brooklyn United` }>
        <div className="tag-route">
          <Backer />
          <BackButton />
          <Posts posts={ posts } />
          <BackButton />
        </div>
      </DocumentTitle>
    );
  }
}
