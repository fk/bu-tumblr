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
          <svg
            className="footer-logo"
            x="0px"
            y="0px"
            viewBox="0 0 240 17.9">
            <g>
              <path
                className="letter"
                d={ "M7.8,17.7H0V0h6.9C8.1,0,9.1,0.1,10,0.4c0.9,0.3,1.5,0.7," +
                  "2,1.2c0.8,0.9,1.2,1.9,1.2,3.1c0,1.4-0.4,2.4-1.3,3.1c-0.3," +
                  "0.2-0.5,0.4-0.6,0.4c-0.1,0.1-0.3,0.2-0.6,0.3c1.1,0.2,2," +
                  "0.7,2.6,1.5c0.7,0.8,1,1.7,1,2.8c0,1.2-0.4,2.3-1.3,3.3" +
                  "C11.9,17.2,10.2,17.7,7.8,17.7z M4,7.1h1.9c1.1,0,1.9-0.1," +
                  "2.4-0.4C8.8,6.6,9.1,6,9.1,5.3c0-0.8-0.2-1.3-0.7-1.6C7.9," +
                  "3.4,7,3.3,5.9,3.3H4V7.1z M4,14.4h2.7c1.1,0,2-0.1,2.6-0.4" +
                  "c0.6-0.3,0.9-0.8,0.9-1.7c0-0.8-0.3-1.4-0.9-1.6" +
                  "c-0.6-0.3-1.6-0.4-2.9-0.4H4V14.4z" } />
              <path
                className="letter"
                d={ "M32.5,5.8c0,2.8-1.1,4.7-3.4,5.5l4.5,6.3h-4.9L24.8,12H22" +
                  "v5.7h-4V0h6.7c2.8,0,4.7,0.5,5.9,1.4C31.9,2.3,32.5,3.8," +
                  "32.5,5.8z M27.7,8c0.5-0.4,0.7-1.1,0.7-2.1c0-1-0.3-1.6" +
                  "-0.8-2c-0.5-0.4-1.4-0.5-2.7-0.5h-3v5.3h2.9C26.3,8.6," +
                  "27.2,8.4,27.7,8z" } />
              <path
                className="letter"
                d={ "M70.1,0h4v7.3L80.7,0h4.9l-7.1,7.8c0.6,0.8,1.7,2.4,3.4," +
                  "4.7c1.6,2.3,2.9,4,3.7,5.2H81l-5.2-7l-1.8,2v5h-4V0z" } />
              <path
                className="letter"
                d="M88.4,17.7V0h4v14.2h7.6v3.5H88.4z"/>
              <path
                className="letter"
                d={ "M108.8,17.7h-4v-7L98.7,0h4.3l3.8,6.6l3.8-6.6" +
                  "h4.3l-6.1,10.7V17.7z" }/>
              <path
                className="letter"
                d="M129.6,0h4v17.7h-4l-8.5-11.1v11.1h-4V0h3.7l8.7,11.4V0z"/>
              <path
                className="letter"
                d={ "M150.5,13.1c0.7,0.8,1.5,1.2,2.7,1.2c1.1,0,2-0.4,2.6-1.2" +
                  "c0.7-0.8,1-1.9,1-3.4V0h4v9.9c0,2.6-0.7,4.5-2.1,5.9c-1.4," +
                  "1.4-3.2,2.1-5.4,2.1c-2.2,0-4-0.7-5.5-2.1" +
                  "c-1.4-1.4-2.1-3.4-2.1-5.9V0h4v9.8C149.5,11.2,149.8," +
                  "12.3,150.5,13.1z" } />
              <path
                className="letter"
                d="M176,0h4v17.7h-4l-8.4-11.1v11.1h-4V0h3.7l8.7,11.4V0z"/>
              <path
                className="letter"
                d="M183.8,0h4v17.7h-4V0z"/>
              <path
                className="letter"
                d="M199.6,3.4v14.3h-4V3.4h-5V0h14v3.4H199.6z"/>
              <path
                className="letter"
                d={ "M220.6,0v3.5h-8.8v3.6h7.9v3.4h-7.9" +
                  "v3.7h9.1v3.5h-13.1V0H220.6z" } />
              <path
                className="letter"
                d={ "M237.5,2.3c1.7,1.5,2.5,3.7,2.5,6.4c0,2.8-0.8,4.9-2.5,6.5" +
                  "c-1.6,1.6-4.2,2.4-7.5,2.4h-6.1V0h6.3C233.4,0,235.8,0.8," +
                  "237.5,2.3z M234.6,12.8c1-0.9,1.5-2.2,1.5-4" +
                  "c0-1.7-0.5-3.1-1.5-4c-1-0.9-2.5-1.4-4.5-1.4h-2.2v10.8h2.5" +
                  "C232.2,14.2,233.6,13.8,234.6,12.8z" } />
              <rect
                className="underline"
                x="36.2"
                y="13.3"
                fill="#69C29F"
                width="30.2"
                height="4.7"/>
            </g>
          </svg>
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
