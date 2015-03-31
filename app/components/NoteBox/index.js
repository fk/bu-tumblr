"use strict";

import React, { PropTypes } from "react/addons";
import warning from "react/lib/warning";
import { List } from "immutable";

const { PureRenderMixin } = React.addons;

class NoteBox extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    return (
      <ul className="note-box">

      </ul>
    );
  }
}

NoteBox.propTypes = {
  notes(props, propName, componentName) {
    let notes = props[propName];

    warning(
      List.isList(notes),
      `${componentName}.props.${propName} expects an immutable List.`
    );

    return null;
  }
};

export default NoteBox;
