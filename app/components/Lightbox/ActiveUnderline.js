import React, { PropTypes } from "react";
import LightboxStore from "../../stores/LightboxStore";
import PureRender from "../../decorators/PureRender";
import storeComponent from "../../decorators/storeComponent";

@PureRender
@storeComponent(LightboxStore)
export default class ActiveUnderline extends React.Component {
  render() {
    return (
      <div className="active-underline" />
    );
  }
}
