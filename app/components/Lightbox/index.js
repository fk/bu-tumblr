"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";
import assign from "object-assign";
import { OrderedMap } from "immutable";
import LightboxThumb from "./LightboxThumb";
import Spinner from "../Spinner";
import LightboxActionCreators from "../../actions/LightboxActionCreators";
import LightboxStore from "../../stores/LightboxStore";
import StoreComponent from "../../decorators/StoreComponent";
import PureRender from "../../decorators/PureRender";
import autobind from "../../decorators/autobind";

const { CSSTransitionGroup } = React.addons;

@PureRender
@StoreComponent(LightboxStore)
export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.navItems = new OrderedMap();
  }

  state = {
    frame: null,
    active: new OrderedMap()
  }

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
      case "Right":
        LightboxActionCreators.moveForward();
        event.preventDefault();
        return false;
      case "Esc":
      case "Escape":
      case "U+001B":
        LightboxActionCreators.closeLightbox();
        event.preventDefault();
        return false;
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyPress);

    if (this.props.lightbox.get("photos").size > 1) {
      this.getFrame();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyPress);
    this.frame = cancelAnimationFrame(this.frame);
    this.navItems = new OrderedMap();
  }

  @autobind
  getFrame(frame) {
    if (this.props.lightbox.get("photos").size < 2) {
      this.componentWillUnmount.call(this);
    }

    let { index } = this.props;
    let { active } = this.state;
    this.frame = requestAnimationFrame(this.getFrame);
    let thumb = React.findDOMNode(this.navItems.get(index));
    let { left, bottom, width } = thumb.getBoundingClientRect();

    bottom = bottom + 8;

    active = active.merge({ left, bottom, width });
    this.setState({ active });
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
    let { active } = this.state;
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
                  ref={ c => this.navItems = this.navItems.set(key, c) }
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
            <div
              style={{
                position: "fixed",
                left: active.get("left"),
                top: active.get("bottom"),
                width: active.get("width")
              }}
              className="active-underline" />
          </nav>
        }
      </div>
    );
  }
}
