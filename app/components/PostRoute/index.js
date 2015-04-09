"use strict";

import React, { PropTypes } from "react";
import warning from "react/lib/warning";
import { Link } from "react-router";
import { OrderedMap } from "immutable";
import moment from "moment";
import Post from "../Post";
import Backer from "../Backer";
import Spinner from "../Spinner";
import NoteBox from "../NoteBox";
import Footer from "../Footer";
import ShareBox from "../ShareBox";
import BackButton from "../BackButton";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import PostActionCreators from "../../actions/PostActionCreators";
import PureRender from "../../decorators/PureRender";
import StoreComponent from "../../decorators/StoreComponent";
import { nameToURI } from "../../utils/uri";

@PureRender
@StoreComponent(PostStore, RouterStore)
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

  componentWillLeave() {
    console.log("!!!");
  }

  render() {
    let { router, post } = this.props;

    if (!post) {
      return (
        <div className="post-route">
          <BackButton />
          <Spinner />
        </div>
      );
    }

    let date = moment(new Date(post.get("date"))).format("MMMM DD, YYYY");

    return (
      <div className="post-route">
        <BackButton />
        <Backer />
        <div className="post-column">
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
            <div className="author">
              By <Link
                to="author"
                params={{ authorName: nameToURI(post.get("author")) }}>
                { post.get("author") }
              </Link> on { date }
            </div>
          }
          <ShareBox
            post={ post }
            single={ true } />
        </div>
        { (post.get("tags").size > 0 || post.get("noteCount") > 0) &&
          <div className="note-band">
            { post.get("tags").size > 0 &&
              <span className="tag-list">
                # { post.get("tags").map(tag => {
                  return (
                    <Link to="/">{ tag.toUpperCase() }</Link>
                  );
                }) }
              </span>
            }
            { post.get("noteCount") > 0 &&
              <span className="note-count">{ post.get("noteCount") } notes</span>
            }
          </div>
        }
        { post.get("noteCount") > 0 &&
          <NoteBox notes={ post.get("notes") } />
        }
        <BackButton />
      </div>
    );
  }
};
