"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";
import warning from "react/lib/warning";
import { List } from "immutable";

const { PureRenderMixin } = React.addons;

const ACTION_MAP = {
  like: "likes",
  reblog: "reblogged"
};

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
        { notes && notes.size > 0 && notes.map((note, key) => {
          let name = `${note.get("blog_name")}.tumblr.com`;
          let avatar = `http://api.tumblr.com/v2/blog/${name}/avatar/16`;
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
              <span className="action">{ action } this</span>
              { note.get("type") === "reblog" &&
                <span className="from-statement">
                  from <Link to="/">Brooklyn United</Link>
                </span>
              }
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
