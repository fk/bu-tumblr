"use strict";

import { Link } from "react-router";
import warning from "react/lib/warning";
import { OrderedMap, Map } from "immutable";
import React, { addons, PropTypes } from "react";

const { PureRenderMixin } = addons;

const getPhotos = (photos, layout) => layout.split("")
  .reduce((memo, row, key, arr) => {
    let chunk = [];

    for (let i = 0; i < row; i++) {
      chunk.push(
        <li>
          <img src={ photos[memo.length + i].original_size.url } />
        </li>
      );
    }

    return memo.concat(chunk);
  }, [])

const Photo = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    width: PropTypes.number.isRequired,

    post: function(props, propName, component) {
      return Map.isMap(props);
    }
  },


  render() {
    const { post, width } = this.props;
    const style = { width };
    const { photoset_layout, photos } = post.toJS();

    return (
      <div
        style={ style }
        className="hero-unit-post">
        <ul className="photos">
          { getPhotos(photos, photoset_layout) }
        </ul>
        { post.get("title") }
      </div>
    );
  }
});

const HeroUnit = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    post(props, propName, component) {
      return Map.isMap(props);
    }
  },

  getInitialState() {
    return { width: 0 };
  },

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  onResize(event) {
    let totalWidth = this.getDOMNode().clientWidth;
    let introWidth = this.refs.intro.getDOMNode().clientWidth;
    let width = totalWidth - introWidth;

    this.setState({ width: width - 10 });
  },

  getPostTemplate(post) {
    const { width } = this.state;
    const postType = post.get("type");

    switch (postType) {
      case "photo":
        return (
          <Photo
            key={ post.get("id") }
            width={ width }
            post={ post } />
        );
    }
  },

  render() {
    return (
      <div className="hero-unit">
        <div
          ref="intro"
          className="intro">
          <div className="we-are">
            <h3>We are<br/>Brooklyn United</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed interdum lacus solliitudin feugiat pellen tesque.</p>
          </div>
          <nav className="hashtags">
            <h4>Search by hashtag</h4>
            <ul>
              <li><Link to="/">#people</Link></li>
              <li><Link to="/">#design</Link></li>
              <li><Link to="/">#strategy</Link></li>
              <li><Link to="/">#business</Link></li>
              <li><Link to="/">#technology</Link></li>
              <li><Link to="/">#client services</Link></li>
              <li><Link to="/">#random</Link></li>
            </ul>
          </nav>
        </div>
        { this.getPostTemplate(this.props.post) }
        <div className="hero-backer" />
      </div>
    );
  }
});

export default HeroUnit;
