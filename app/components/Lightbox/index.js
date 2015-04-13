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

  handleClose(event) {
    LightboxActionCreators.closeLightbox();
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
          { photos.map((photo, key) => {
            return (
              <LightboxThumb
                key={ key }
                index={ key }
                photo={ photo } />
            );
          }) }
        </nav>
      </div>
    );
  }
};
