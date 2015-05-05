"use strict";

import React, { PropTypes } from "react/addons";
import { Link } from "react-router";

export default class ShareBox extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    post: PropTypes.object.isRequired,
    single: PropTypes.bool
  }

  static defaultProps = {
    single: false
  }

  render() {
    const { post, single, thumbnail } = this.props;
    const uriUrl = encodeURIComponent(
      `http://blog.brooklynunited.com/post/${post.get("id")}/${post.get("uri")}`
    );
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${uriUrl}`;

    return (
      <nav className="social">
        { !single &&
          <Link
            to="post"
            params={{ postId: post.get("id"), postUri: post.get("uri") }}
            className="large">
            <span className="cube">
              <span className="face front link">
                <i className="fa fa-link" />
              </span>
              <span className="face bottom link">
                <i className="fa fa-link" />
              </span>
            </span>
          </Link>
        }
        { !thumbnail &&
          <a href="#">
            <span className="cube">
              <span className="face front envelope">
                <i className="fa fa-envelope" />
              </span>
              <span className="face bottom envelope">
                <i className="fa fa-envelope" />
              </span>
            </span>
          </a>
        }
        { !thumbnail &&
          <a href="#">
            <span className="cube">
              <span className="face front twitter">
                <i className="fa fa-twitter" />
              </span>
              <span className="face bottom twitter">
                <i className="fa fa-twitter" />
              </span>
            </span>
          </a>
        }
        { !thumbnail &&
          <a href="#">
            <span className="cube">
              <span className="face front retweet">
                <i className="fa fa-retweet" />
              </span>
              <span className="face bottom retweet">
                <i className="fa fa-retweet" />
              </span>
            </span>
          </a>
        }
        { !thumbnail &&
          <a href={ `https://www.facebook.com/sharer/sharer.php?u=${fbUrl}` }>
            <span className="cube">
              <span className="face front facebook">
                <i className="fa fa-facebook" />
              </span>
              <span className="face bottom facebook">
                <i className="fa fa-facebook" />
              </span>
            </span>
          </a>
        }
      </nav>
    );
  }
}
