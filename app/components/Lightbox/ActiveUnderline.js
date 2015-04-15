import React, { PropTypes } from "react";
import LightboxStore from "../../stores/LightboxStore";
import PureRender from "../../decorators/PureRender";
import StoreComponent from "../../decorators/StoreComponent";

@PureRender
@StoreComponent(LightboxStore)
export default class ActiveUnderline extends React.Component {
  render() {
    return (
      <div className="active-underline" />
    );
  }
}
