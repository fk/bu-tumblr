"use strict";

import { Map } from "immutable";
import HeroBox from "./TitleBox";
import warning from "react/lib/warning";
import classNames from "classnames";
import React, { PropTypes } from "react/addons";

const { PureRenderMixin } = React.addons;

export default class PostPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.renderPhoto = this.renderPhoto.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  renderPhoto(photo, key, array) {
    const { post } = this.props;
    const { photosetLayout } = post.toJS();
    let flex = 1;
    let height = 1;

    if (photosetLayout) {
      let rows = photosetLayout.split("");
      let flexList = rows.map(n => parseInt(n, 10))
        .reduce((memo, n) => {
          return memo.concat(Array.from({ length: n }, o => n));
        }, []);

      height = rows.length;
      flex = flexList[key];
    }

    let styles = {
      backgroundImage: `url("${photo.alt_sizes[0].url}")`
    };

    return (
      <li
        key={ key }
        className={ `photo flex-${flex} height-${height}` }
        style={ styles } />
    );
  }

  render() {
    const { post, className } = this.props;
    const { photos } = post.toJS();

    return (
      <div
        className={ className }>
        <ul className="photos">
          { photos.map(this.renderPhoto) }
        </ul>
        <HeroBox post={ post } />
      </div>
    );
  }
};

PostPhoto.propTypes = {
  post(props, propName, component) {
    let post = props[propName];

    warning(
      Map.isMap(post),
      "Expected map to be an instance of an Immutable.Map, received %s",
      typeof post
    );

    return null;
  },
  inViewport: PropTypes.bool.isRequired,
  className: PropTypes.string
};

const getIndex = (memo, row) => {
  return memo + row.props.children.length;
};
