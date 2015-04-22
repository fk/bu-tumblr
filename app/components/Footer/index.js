"use strict";

import React, { PropTypes } from "react";

export default class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <footer className="footer">
        <article className="footer-column connect">
          <a
            href="http://www.digital.nyc/startups"
            className="made-in">
            Made in NY
          </a> |
          <nav>
            <ul>
              <li>
                <a href="http://www.twitter.com/brooklynunited">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="http://www.facebook.com/brooklynunited">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="http://www.instagram.com/brooklynunited">
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/brooklynunited">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            </ul>
          </nav>
        </article>
        <article className="footer-column">
          <img src="/img/brooklynunited-logo-animated.gif" />
        </article>
        <article className="footer-column">
          <address
            className="address"
            itemScope
            itemType="http://schema.org/PostalAddress">
            <span itemProp="streetAddress">20 Jay St. #402, </span>
            <span itemProp="addressLocality">Brooklyn, </span>
            <span itemProp="addressRegion">NY</span>
            <span itemProp="postalCode">11201</span>
          </address>
          <a
            className="phone"
            href="tel:1-718-254-9048">
            +1 718 254 9048
          </a>
          <a
            className="contact"
            href="http://brooklynunited.com/#talk-to-us">
            Get in touch
          </a>
        </article>
      </footer>
    );
  }
}
