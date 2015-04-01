"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";
import { Map } from "immutable";
import warning from "react/lib/warning";
import classNames from "classnames";
import TitleBox from "./TitleBox";
import LightboxActionCreators from "../../actions/LightboxActionCreators";

const { PureRenderMixin } = React.addons;

export default class PostPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.renderPhoto = this.renderPhoto.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  handlePhotoClick(photo) {
    const { single } = this.props;
    let photos = this.props.post.get("photos");

    return (event) => {
      if (single) {
        event.preventDefault();
        let index = photos.indexOf(photo);
        LightboxActionCreators.openLightboxWithPhotosAtIndex({ photos, index });
      }
    };
  }

  renderPhoto(photo, key, array) {
    const { post, single } = this.props;
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
      backgroundImage: `url("${photo.getIn(["alt_sizes", 0, "url"])}")`
    };

    return (
      <li
        key={ key }
        onClick={ this.handlePhotoClick(photo) }
        className={ `photo flex-${flex} height-${height}` }
        style={ styles } />
    );
  }

  render() {
    const { post, className, single } = this.props;
    const photos = post.get("photos");

    return (
      <div
        className={ className }>
        { single &&
          <ul className="photos">
            { photos.map(this.renderPhoto) }
          </ul>
        }
        { !single &&
          <Link
            to="post"
            params={{ postId: post.get("id") }}>
            <ul className="photos">
              { photos.map(this.renderPhoto) }
            </ul>
          </Link>
        }
        {!single &&
          <TitleBox post={ post } />
        }
      </div>
    );
  }
};

PostPhoto.defaultProps = {
  single: false
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
  className: PropTypes.string,
  single: PropTypes.bool
};

const getIndex = (memo, row) => {
  return memo + row.props.children.length;
};
