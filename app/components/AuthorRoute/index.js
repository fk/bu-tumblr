"use strict";

import React from "react";
import DocumentTitle from "react-document-title";
import Spinner from "../Spinner";
import Backer from "../Backer";
import Post from "../Post";
import BackButton from "../BackButton";
import AuthorActionCreators from "../../actions/AuthorActionCreators";
import AuthorStore from "../../stores/AuthorStore";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import storeComponent from "../../decorators/storeComponent";
import PureRender from "../../decorators/PureRender";
import { uriToName } from "../../utils/uri";

@PureRender
@storeComponent(AuthorStore, PostStore, RouterStore)
export default class AuthorRoute extends React.Component {
  static async fetchData(params, query) {
    let { authorName } = params;

    authorName = uriToName(authorName);

    return AuthorActionCreators.getAuthor(authorName);
  }

  static getStateFromStores(props) {
    let { router } = RouterStore.getState();
    let { loading } = AuthorStore.getState();

    let authorName = router.getIn(["params", "authorName"]);
    authorName = uriToName(authorName);
    let author = AuthorStore.getByName(authorName);
    let posts = PostStore.getPostsByAuthor(authorName);

    return { author, loading, posts };
  }

  render() {
    let { author, posts, loading } = this.props;

    if (loading || !author) {
      return (
        <Spinner />
      );
    }

    return (
      <DocumentTitle title={ `${author.get("name")} - Brooklyn United` }>
        <div className="author-route">
          <BackButton />
          <Backer />
          { author &&
            <div className="author-column">
              { author && author.has("photos") &&
                <img
                  className="author-photo"
                  src={
                    author.getIn(["photos", 0, "alt_sizes", 2, "url"])
                  }
                  width={
                    author.getIn(["photos", 0, "alt_sizes", 2, "width"])
                  }
                  height={
                    author.getIn(["photos", 0, "alt_sizes", 2, "height"])
                  } />
              }
              <hgroup className="author-titles">
                <h2>{ author.get("name") }</h2>
                <h3>{ author.get("position") }</h3>
              </hgroup>
              <div dangerouslySetInnerHTML={{
                __html: author.get("caption")
              }} />
            </div>
          }
          { author && posts && posts.size > 0 &&
            <div className="posts-by-author">
              <h4>Posts from { author.get("name").split(" ").shift() }</h4>
              { posts.toList().map((post, key) => {
                return (
                  <Post
                    thumbnail={ true }
                    key={ key }
                    post={ post } />
                );
              }) }
            </div>
          }
          <BackButton />
        </div>
      </DocumentTitle>
    );
  }
}
