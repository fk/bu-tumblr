"use strict";

import React, { PropTypes } from "react/addons";
import warning from "react/lib/warning";
import { Link } from "react-router";
import { OrderedMap } from "immutable";
import moment from "moment";
import Post from "../Post";
import Backer from "../Backer";
import NoteBox from "../NoteBox";
import ShareBox from "../ShareBox";
import BackButton from "../BackButton";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import { nameToURI } from "../../utils/uri";
import storeComponent from "../../utils/storeComponent";
import PostActionCreators from "../../actions/PostActionCreators";

const { PureRenderMixin } = React.addons;

class PostRoute extends React.Component {
  static async fetchData(props) {
    let { postId } = props.params;

    return await PostActionCreators.getPost(postId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.post) return false;

    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    let { router, post } = this.props;
    let caption = post.get("caption");
    let tags = post.get("tags");
    let noteCount = post.get("noteCount");
    let author = post.get("author");
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
          { !!caption && !!caption.trim() &&
            <span
              className="post-caption"
              dangerouslySetInnerHTML={{ __html: caption }} />
          }
          { author &&
            <div className="author">
              By <Link
                to="author"
                params={{ authorName: nameToURI(author) }}>
                { author }
              </Link> on { date }
            </div>
          }
          <ShareBox
            post={ post }
            single={ true } />
        </div>
        { (tags.size > 0 || noteCount > 0) &&
          <div className="note-band">
            { tags.size > 0 &&
              <span className="tag-list">
                # { tags.map(tag => {
                  return (
                    <Link to="/">{ tag.toUpperCase() }</Link>
                  );
                }) }
              </span>
            }
            { noteCount > 0 &&
              <span className="note-count">{ noteCount } notes</span>
            }
          </div>
        }
        { noteCount > 0 &&
          <NoteBox notes={ post.get("notes") } />
        }
        <BackButton />
      </div>
    );
  }
};

const getState = () => {
  let { router } = RouterStore.getState();
  let postId = router.getIn(["params", "postId"]);
  let post = PostStore.getById(postId);

  return { router, post };
};

export default storeComponent(PostRoute, [PostStore, RouterStore], getState);
