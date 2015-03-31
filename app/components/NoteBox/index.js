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
    let { notes } = this.props;

    return (
      <ul className="note-box">
        { notes.map((note, key) => {
          console.log(note.toJS());
          return (
            <li
              className="note"
              key={ key }>
              <span>{ note.get("blog_name") }</span>
            </li>
          );
        }) }
      </ul>
    );
  }
}

NoteBox.propTypes = {
  notes(props, propName, componentName) {
    let notes = props[propName];

    warning(
      List.isList(notes),
      `${componentName}.props.${propName} should be an immutable List.`
    );

    return null;
  }
};

export default NoteBox;
