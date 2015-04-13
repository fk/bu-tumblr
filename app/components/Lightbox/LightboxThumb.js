import React, { PropTypes } from "react";
import autobind from "../../decorators/autobind";
import LightboxActionCreators from "../../actions/LightboxActionCreators";

export default class LightboxThumb extends React.Component {
  @autobind
  handleSelectThumb(event) {
    let { index } = this.props;

    event.stopPropagation();
    LightboxActionCreators.setIndex(index);
  }

  render() {
    let { photo } = this.props;
    let thumb = photo.alt_sizes[photo.alt_sizes.length - 1];

    return (
      <img
        onClick={ this.handleSelectThumb }
        className="thumb"
        src={ thumb.url }
        width={ photo.width }
        height={ photo.height } />
    );
  }
}
