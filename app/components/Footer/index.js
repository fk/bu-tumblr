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
          &copy; 2016
        </article>
      </footer>
    );
  }
}
