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

  renderPhoto(opts) {
    const { rows, sizes } = opts;

    return (photo, key) => {
      let { url } = photo.alt_sizes[0];
      let size = sizes[key] || 1;

      let style = {
        backgroundImage: `url(${url})`,
        width: `${(1 / size) * 100}%`,
        height: `${(1 / rows.length) * 100}%`,
        float: "left"
      };

      return (
        <li
          className="photo"
          key={key}
          style={style} />
      );
    };
  },

  render() {
    let { post: rawPost }= this.props;
    let post = rawPost.toJS();
    let layout = this.props.post.get("photoset_layout");
    let rows = layout ? layout.split("").map(row => parseInt(row, 10)) : [1];
    let sizes = expandSizes(rows);

    let style = { paddingBottom: `${rows.length * 48}%` };

    return (
      <div style={style} className="post">
        { post.photos &&
          <ul className="photos">
            { post.photos.map(this.renderPhoto({ rows, sizes })) }
          </ul>
        }
        { post.tags && post.tags.length > 0 &&
          <TagList tags={ post.tags } />
        }
      </div>
    );
  }
});

let expandSizes = (rows) => rows.reduce((memo, size) => {
  let count = parseInt(size, 10);
  while (count > 0) {
    count--;
    memo.push(parseInt(size, 10));
  }
  return memo;
}, []);

export default Post;
