"use strict";

import { Map } from "immutable";
import ShareBox from "../ShareBox";
import React, { PropTypes } from "react/addons";

const { PureRenderMixin } = React.addons;

export default class PostPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    const { post, width, className } = this.props;
    const style = { width };
    const { photosetLayout, photos } = post.toJS();

    return (
      <div
        style={ style }
        className={ className }>
        <ul className="photos">
          { getPhotos(photos, photosetLayout) }
        </ul>
        <div className="title-box">
          <h3>{ post.get("title") }</h3>
          <ShareBox />
        </div>
      </div>
    );
  }
};

PostPhoto.propTypes = {
  width: PropTypes.number.isRequired,
  post(props, propName, component) {
    return Map.isMap(props);
  }
};

const getIndex = (memo, row) => {
  return memo + row.props.children.length;
};

const getPhotos = (photos, layout) => (layout || "1").split("")
  .reduce((...parts) => {
    const [memo, row, key, rows] = parts;
    let chunk = [];

    for (let i = 0; i < row; i++) {
      const index = memo.reduce(getIndex, i);
      let backgroundImage = photos[index].original_size.url;

      chunk.push(
        <div
          key={ `row-${row}-image-${i}` }
          className={ `photo-layout photo-layout-${row}` }>
          <figure
            className="photo-figure"
            style={{ backgroundImage: `url("${backgroundImage}")` }} />
        </div>
      );
    }

    let setRow = (
      <li
        key={key}
        className={ `photoset-row row-${rows.length}` }>
        { chunk }
      </li>
    );

    return memo.concat([setRow]);
  }, []);
