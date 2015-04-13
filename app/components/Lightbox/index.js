"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";
import LightboxThumb from "./LightboxThumb";
import Spinner from "../Spinner";
import LightboxActionCreators from "../../actions/LightboxActionCreators";
import LightboxStore from "../../stores/LightboxStore";
import StoreComponent from "../../decorators/StoreComponent";
import PureRender from "../../decorators/PureRender";

const { CSSTransitionGroup } = React.addons;

@PureRender
@StoreComponent(LightboxStore)
export default class Lightbox extends React.Component {
  static getStateFromStores(props) {
    let { lightbox } = LightboxStore.getState();

    return { lightbox };
  }

  handleKeyPress(event) {
    switch (event.keyIdentifier) {
      case "Left":
        LightboxActionCreators.moveBack();
        event.preventDefault();
        return false;
        break;
      case "Right":
        LightboxActionCreators.moveForward();
        event.preventDefault();
        return false;
        break;
      case "Esc":
      case "Escape":
      case "U+001B":
        LightboxActionCreators.closeLightbox();
        event.preventDefault();
        break;
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyPress);
  }

  handleClose(event) {
    LightboxActionCreators.closeLightbox();
  }

  handleMoveBack(event) {
    event.stopPropagation();
    LightboxActionCreators.moveBack();
  }

  handleMoveForward(event) {
    event.stopPropagation();
    LightboxActionCreators.moveForward();
  }

  render() {
    let { lightbox } = this.props;
    let { photos, index } = lightbox.toJS();
    let photo = photos[index];
    let cx = classNames(["image-large-container", {
      "center": photos.length === 1
    }]);
    let image;
    if (photo) {
      image = photo.alt_sizes[0];
    }

    return (
      <div
        onClick={ this.handleClose }
        className="lightbox">
        { !image &&
          <Spinner />
        }
        { image &&
          <div className={ cx }>
            <img
              className="image-large"
              key={ image.url }
              width={ image.width }
              height={ image.height }
              src={ image.url } />
          </div>
        }
        { photos && photos.length > 1 &&
          <nav className="image-thumbs">
            <button
              className="lightbox-arrow left"
              onClick={ this.handleMoveBack }>
              <i className="fa fa-angle-left" />
            </button>
            { photos.map((thumb, key) => {
              return (
                <LightboxThumb
                  key={ key }
                  index={ key }
                  photo={ thumb } />
              );
            }) }
            <button
              className="lightbox-arrow right"
              onClick={ this.handleMoveForward }>
              <i className="fa fa-angle-right" />
            </button>
          </nav>
        }
      </div>
    );
  }
};
