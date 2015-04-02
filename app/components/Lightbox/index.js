"use strict";

import React, { PropTypes } from "react/addons";
import LightboxStore from "../../stores/LightboxStore";
import storeComponent from "../../utils/storeComponent";

const { PureRenderMixin } = React.addons;

class Lightbox extends React.Component {
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
}

const getStoreState = props => {
  let { lightbox } = LightboxStore.getState();

  return { lightbox };
};

export default storeComponent(Lightbox, [LightboxStore], getStoreState);
