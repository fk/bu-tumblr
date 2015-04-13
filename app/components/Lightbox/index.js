"use strict";

import React, { PropTypes } from "react/addons";
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

  render() {
    let { lightbox } = this.props;
    let { photos, index } = lightbox.toJS();
    let photo = photos[index].alt_sizes[0];

    return (
      <div className="lightbox">
        <h2></h2>
        <img
          className="image-large"
          width={ photo.width }
          height={ photo.height }
          src={ photo.url } />
        <nav className="image-thumbs">
          { photos.map((photo, key) => {
            let thumb = photo.alt_sizes[photo.alt_sizes.length - 1];

            return (
              <img
                className="thumb"
                src={ thumb.url }
                width={ photo.width }
                height={ photo.height } />
            );
          }) }
        </nav>
      </div>
    );
  }
};
