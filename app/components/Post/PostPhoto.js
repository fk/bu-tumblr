"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import warning from "react/lib/warning";
import { Map } from "immutable";
import classNames from "classnames";
import moment from "moment";
import AuthorByLine from "../AuthorByLine";
import LightboxStore from "../../stores/LightboxStore";
import LightboxActionCreators from "../../actions/LightboxActionCreators";
import storeComponent from "../../decorators/storeComponent";
import autobind from "../../decorators/autobind";
import PureRender from "../../decorators/PureRender";
import { nameToURI } from "../../utils/uri";

@PureRender
@storeComponent(LightboxStore)
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
    single: PropTypes.bool,
    condensed: PropTypes.bool
  }

  static defaultProps = {
    single: false,
    condensed: false
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
    const {
      post,
      single,
      inViewport,
      transition,
      lightbox,
      condensed
    } = this.props;

    let { photosetLayout } = post.toJS();

    if (condensed && photosetLayout) {
      let splitLayout = photosetLayout.split("");
      photosetLayout = "";

      for (let i  = 0; i < splitLayout.length; i++) {
        let numOne = parseInt(splitLayout[i], 10);
        let numTwo = parseInt(splitLayout[i + 1], 10);
        let numThree = parseInt(splitLayout[i + 1], 10);

        if (numOne === 1 && numTwo === 1 && numThree === 1) {
          photosetLayout += "3";
          i += 2;
        }
        else if (((numOne === 1) || (numTwo === 1)) && (numOne + numTwo < 3)) {
          photosetLayout += (numOne + numTwo).toString();
          i += 1;
        }
        else {
          photosetLayout += numOne.toString();
        }
      }
    }

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

    if (!photosetLayout) {
      let width = photo.getIn(["alt_sizes", 0, "width"]);
      let height = photo.getIn(["alt_sizes", 0, "height"]);
      let paddingBottom = ((height / width) * 100);

      if (paddingBottom > 75) {
        paddingBottom = 50;
      }

      styles.height = 0;
      styles.paddingBottom = paddingBottom + "%";
    }

    return (
      <li
        key={ key }
        onMouseEnter={ this.handleHover(key) }
        onMouseLeave={ this.handleHover(null) }
        onClick={ this.handlePhotoClick(photo) }
        className={ cx }
        style={ styles }>
        <div className="shade" />
      </li>
    );
  }

  render() {
    const { post, className, single } = this.props;
    const photos = post.get("photos");
    let date;

    if (post) {
      date = moment(new Date(post.get("date"))).format("MMMM DD, YYYY");
    }

    return (
      <div
        className={ className }>
        <ul className="photos">
          { photos.map(this.renderPhoto) }
        </ul>
        { (!single && (post.has("caption") && !!post.get("caption").trim() )
          || post.has("author")) &&
          <div className="post-body">
            { post.has("caption") && !!post.get("caption").trim() &&
              <span
                className="post-caption"
                dangerouslySetInnerHTML={{ __html: post.get("caption") }} />
            }
            { post.has("author") &&
              <AuthorByLine post={ post } />
            }
          </div>
        }
      </div>
    );
  }
}

export default PostPhoto;
