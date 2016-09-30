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
          <nav>
            <ul>
              <li>
                <a href="http://www.twitter.com/fk">
                  <i className="fa fa-twitter" />
                </a>
              </li>
            </ul>
          </nav>
        </article>
        <article className="footer-column">

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
