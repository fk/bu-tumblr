"use strict";

import React, { PropTypes } from "react";
import warning from "warning";
import { List } from "immutable";
import PureRender from "../../decorators/PureRender";

const ACTION_MAP = {
  like: "likes",
  reblog: "reblogged",
  posted: "posted"
};

@PureRender
class NoteBox extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    notes(props, propName, componentName) {
      let notes = props[propName];

      warning(
        List.isList(notes),
        `${componentName}.props.${propName} should be an immutable List.`
      );

      return null;
    }
  }

  render() {
    let { notes } = this.props;

    return (
      <ul className="note-box">
        { notes && notes.size > 0 && notes.map((note, key) => {
          let name = `${note.get("blog_name")}.tumblr.com`;
          let avatar = `http://api.tumblr.com/v2/blog/${name}/avatar/48`;
          let action = ACTION_MAP[note.get("type")];

          return (
            <li
              className="note"
              key={ key }>
              <img
                className="avatar"
                src={ avatar } />
              <a
                href={ note.get("blog_url") }
                className="blog-name">
                { note.get("blog_name") }
              </a>
              <span className="action"> { action } this</span>
              { note.get("type") === "reblog" &&
                <span className="reblogged-from"> from { note.get("reblog_parent_blog_name") }</span>
              }
            </li>
          );
        }) }
      </ul>
    );
  }
}

export default NoteBox;
