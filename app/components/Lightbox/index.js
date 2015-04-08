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
    let photo = photos[index];

    return (
      <div className="lightbox">
        <h2></h2>
      </div>
    );
  }
};
