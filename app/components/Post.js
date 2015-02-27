"use strict";

import React from "react/addons";

var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var Post = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    post: PropTypes.object.isRequired
  },

  renderPhoto(photo, key) {
    return (
      <li key={key}>
        <img src={photo.alt_sizes[0].url} />
      </li>
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
      </div>
    );
  }
});

export default Post;
