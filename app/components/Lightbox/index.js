"use strict";

import React, { PropTypes } from "react/addons";
import LightboxThumb from "./LightboxThumb";
import LightboxActionCreators from "../../actions/LightboxActionCreators";
import LightboxStore from "../../stores/LightboxStore";
import StoreComponent from "../../decorators/StoreComponent";
import PureRender from "../../decorators/PureRender";

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
    let photo = photos[index].alt_sizes[0];

    return (
      <div
        onClick={ this.handleClose }
        className="lightbox">
        <div className="image-large-container">
          <img
            className="image-large"
            width={ photo.width }
            height={ photo.height }
            src={ photo.url } />
        </div>
        <nav className="image-thumbs">
          <button
            className="lightbox-arrow left"
            onClick={ this.handleMoveBack }>
            <i className="fa fa-angle-left" />
          </button>
          { photos.map((photo, key) => {
            return (
              <LightboxThumb
                key={ key }
                index={ key }
                photo={ photo } />
            );
          }) }
          <button
            className="lightbox-arrow right"
            onClick={ this.handleMoveForward }>
            <i className="fa fa-angle-right" />
          </button>
        </nav>
      </div>
    );
  }
};
