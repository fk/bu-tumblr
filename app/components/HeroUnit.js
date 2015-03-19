"use strict";

import { Link } from "react-router";
import warning from "react/lib/warning";
import { OrderedMap, Map } from "immutable";
import React, { addons, PropTypes } from "react";

const { PureRenderMixin } = addons;

const getIndex = (memo, row) => {
  return memo + row.props.children.length;
};

const getPhotos = (photos, layout) => layout.split("")
  .reduce((...parts) => {
    const [memo, row, key, rows] = parts;
    let chunk = [];

    let setRow = (
      <li className={ `photoset-row row-${rows.length}` } />
    );

    for (let i = 0; i < row; i++) {
      const index = memo.reduce(getIndex, i);
      let backgroundImage = photos[index].original_size.url;

      chunk.push(
        <div
          key={ `row-${row}-image-${i}` }
          className={ `photo-layout photo-layout-${row}` }>
          <figure
            className="photo-figure"
            style={{ backgroundImage: `url("${backgroundImage}")` }} />
        </div>
      );
    }

    setRow.props.children = chunk;

    return memo.concat([setRow]);
  }, []);

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
    const { photosetLayout, photos } = post.toJS();

    return (
      <div
        style={ style }
        className="hero-unit-post">
        <ul className="photos">
          { getPhotos(photos, photosetLayout) }
        </ul>
        <div className="title-box">
          <h3>{ post.get("title") }</h3>
          <nav className="social">
            <a href="#"><i className="fa fa-envelope" /></a>
            <a href="#"><i className="fa fa-twitter" /></a>
            <a href="#"><i className="fa fa-retweet" /></a>
            <a href="#"><i className="fa fa-facebook" /></a>
          </nav>
        </div>
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

    this.setState({ width: width - 30 });
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
        <svg
          viewBox="0 0 100 100"
          className="backer"
          preserveAspectRatio="none">
          <g>
            <path d="M0,0 L100,0 L100,100 L0,80" />
          </g>
        </svg>
      </div>
    );
  }
});

export default HeroUnit;
