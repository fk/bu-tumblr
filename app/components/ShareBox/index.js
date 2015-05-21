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
    const url = `http://blog.brooklynunited.com/post/${post.get("id")}/` +
      `${post.get("uri")}`;
    const uriUrl = encodeURIComponent(url);
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twUrl = `http://twitter.com/home?status=Check%20out%20@` +
      `brooklynunited’s%20zany%20blog ${uriUrl}`;
    const tmUrl = `https://www.tumblr.com/reblog/${post.get("id")}/`
     + `${post.get("reblogKey")}`;
    const emUrl = `mailto:?subject=Check%20out%20@` +
      `brooklynunited’s%20zany%20blog&body=Check%20out%20@` +
      `brooklynunited’s%20zany%20blog ${url}`;

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
          <a href={ emUrl }>
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
          <a href={ twUrl }>
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
          <a href={ tmUrl }>
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
          <a href={ fbUrl }>
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
