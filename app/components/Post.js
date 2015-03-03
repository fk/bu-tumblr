"use strict";

import React from "react/addons";
import TagList from "./TagList";

const { PropTypes } = React;
const { PureRenderMixin } = React.addons;

let Post = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    post: PropTypes.object.isRequired
  },

  renderPhoto(photo, key) {
    let { url } = photo.alt_sizes[0];
    let style = {
      backgroundImage: `url(${url})`
    };

    return (
      <li
        className="photo"
        key={key}
        style={style} />
    );
  },

  render() {
    let { post: rawPost }= this.props;
    let post = rawPost.toJS();

    return (
      <div className="post">
        { post.photos &&
          <ul className="photos">
            {post.photos.map(this.renderPhoto)}
          </ul>
        }
        { post.tags && post.tags.length > 0 &&
          <ul className="tags">

          </ul>
        }
      </div>
    );
  }
});

export default Post;
