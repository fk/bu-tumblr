"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import warning from "react/lib/warning";
import { Map } from "immutable";
import classNames from "classnames";
import LightboxStore from "../../stores/LightboxStore";
import LightboxActionCreators from "../../actions/LightboxActionCreators";
import StoreComponent from "../../decorators/StoreComponent";
import autobind from "../../decorators/autobind";
import PureRender from "../../decorators/PureRender";

@PureRender
@StoreComponent(LightboxStore)
class PostPhoto extends React.Component {
  state = {
    hovered: null
  }

  static getStateFromStores(props) {
    let { lightbox } = LightboxStore.getState();

    return { lightbox };
  }

  static propTypes = {
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
  }

  static defaultProps = {
    single: false
  }

  @autobind
  handlePhotoClick(photo) {
    let photos = this.props.post.get("photos");

    return (event) => {
      event.preventDefault();
      let index = photos.indexOf(photo);
      LightboxActionCreators.openLightboxWithPhotosAtIndex({ photos, index });
    };
  }

  @autobind
  handleHover(index) {
    return (event) => {
      this.setState({ hovered: index });
    };
  }

  @autobind
  renderPhoto(photo, key, array) {
    const { hovered } = this.state;
    const { post, single, inViewport, transition, lightbox } = this.props;
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

    let i = 1 + key;

    let cx = classNames(["photo", `flex-${flex}`, `height-${height}`, {
      "dimmed": (hovered !== null) &&
        (hovered !== key) &&
        lightbox.get("photos").size === 0,
      "scaled": hovered === key &&
        lightbox.get("photos").size === 0
    }]);

    let styles = {
      backgroundImage: `url("${photo.getIn(["alt_sizes", 0, "url"])}")`
    };

    return (
      <li
        key={ key }
        onMouseEnter={ this.handleHover(key) }
        onMouseLeave={ this.handleHover(null) }
        onClick={ this.handlePhotoClick(photo) }
        className={ cx }
        style={ styles } />
    );
  }

  render() {
    const { post, className, single } = this.props;
    const photos = post.get("photos");

    return (
      <div
        className={ className }>
        <ul className="photos">
          { photos.map(this.renderPhoto) }
        </ul>
      </div>
    );
  }
}

export default PostPhoto;
