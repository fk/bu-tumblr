"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";
import { OrderedMap } from "immutable";
import Post from "../Post";
import NoteBox from "../NoteBox";
import ShareBox from "../ShareBox";
import warning from "react/lib/warning";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import storeComponent from "../../utils/storeComponent";
import PostActionCreators from "../../actions/PostActionCreators";

const { PureRenderMixin } = React.addons;

class PostRoute extends React.Component {
  constructor(props) {
    super(props);
  }

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

    return (
      <div className="post-route">
        <Link
          className="go-back"
          to="/">
          <i className="fa fa-angle-left" />&nbsp;
          Back
        </Link>
        <div className="backer">
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 100 100">
            <g>
              <path d="M0,0 L0,100 L100,100" />
            </g>
          </svg>
        </div>
        <div className="post-column">
          { post.has("title") &&
            <h2>{ post.get("title") }</h2>
          }
          <Post
            post={ post }
            single={ true } />
          { caption.trim() &&
            <span
              className="post-caption"
              dangerouslySetInnerHTML={{ __html: caption }} />
          }
          <ShareBox />
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
