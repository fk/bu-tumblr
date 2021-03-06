"use strict";

import React, { PropTypes } from "react";
import warning from "react/lib/warning";
import { Link } from "react-router";
import DocumentTitle from "react-document-title";
import { OrderedMap } from "immutable";
import Post from "../Post";
import Backer from "../Backer";
import Spinner from "../Spinner";
import AuthorByLine from "../AuthorByLine";
import NoteBox from "../NoteBox";
import Footer from "../Footer";
import ShareBox from "../ShareBox";
import BackButton from "../BackButton";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import PostActionCreators from "../../actions/PostActionCreators";
import PureRender from "../../decorators/PureRender";
import storeComponent from "../../decorators/storeComponent";

@PureRender
@storeComponent(PostStore, RouterStore)
export default class PostRoute extends React.Component {
  static async fetchData(params) {
    let { postId } = params;

    return await PostActionCreators.getPost(postId);
  }

  static getStateFromStores(props) {
    let { router } = RouterStore.getState();
    let postId = router.getIn(["params", "postId"]);
    let post = PostStore.getById(postId);

    return { router, post };
  }

  render() {
    let { router, post } = this.props;
    let title;

    if (post) {
      title = post.has("title") ?
        post.get("title") :
        post.get("type").charAt(0).toUpperCase() + post.get("type").slice(1);
    }

    return (
      <DocumentTitle title={ `${title} - Brooklyn United` }>
        <div className="post-route">
          <BackButton />
          { !post &&
            <Spinner />
          }
          <Backer />
          { post &&
            <div className="post-column">
              <ShareBox
                post={ post }
                single={ true } />
              { post.has("title") &&
                <h2>{ post.get("title") }</h2>
              }
              <Post
                post={ post }
                single={ true } />
              { post.has("caption") && !!post.get("caption").trim() &&
                <span
                  className="post-caption"
                  dangerouslySetInnerHTML={{ __html: post.get("caption") }} />
              }
              { post.has("author") &&
                <AuthorByLine post={ post } />
              }
            </div>
          }
          { post && (post.get("tags").size > 0 || post.get("noteCount") > 0) &&
            <div className="note-band">
              { post.get("tags").size > 0 &&
                <span className="tag-list">
                  # { post.get("tags").map((tag, key) => {
                    return (
                      <Link
                        key={ key }
                        to="tag"
                        params={{ tagName: tag }}>
                        { tag.toUpperCase() }
                      </Link>
                    );
                  }) }
                </span>
              }
              { post.get("noteCount") > 0 &&
                <span className="note-count">
                  { post.get("noteCount") } notes
                </span>
              }
            </div>
          }
          { post && post.get("noteCount") > 0 &&
            <NoteBox notes={ post.get("notes") } />
          }
          <BackButton />
        </div>
      </DocumentTitle>
    );
  }
}
