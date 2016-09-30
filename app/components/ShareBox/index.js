"use strict";

import React, { PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";
import Icon from "../Icons";

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
    const url = `http://hellodirty.com/post/${post.get("id")}/` +
      `${post.get("uri")}`;
    const uriUrl = encodeURIComponent(url);
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twUrl = `http://twitter.com/home?status=Check%20out%20@` +
      ` ${uriUrl}`;
    const tmUrl = `https://www.tumblr.com/reblog/${post.get("id")}/`
     + `${post.get("reblogKey")}`;
    const emUrl = `mailto:?subject=Check%20out%20@` +
      `&body=Check%20out%20@` +
      ` ${url}`;

    let date;
    let postDate = post.get("date").split(" ").shift();

    if (post) {
      date = moment(postDate).format("MMMM DD, YYYY");
    }

    return (
      <nav className="social">
        { !single &&
          <Link
            to="post"
            params={{ postId: post.get("id"), postUri: post.get("uri") }}
            className="link">
              <Icon icon="link" />
              <span className="post-date">{ date }</span>
          </Link>
        }
        { !thumbnail &&
          <a href={ emUrl } className="envelope">
            <Icon icon="email" />
          </a>
        }
        { !thumbnail &&
          <a href={ twUrl } className="twitter">
            <Icon icon="twitter" />
          </a>
        }
        { !thumbnail &&
          <a href={ tmUrl } className="retweet">
            <Icon icon="reblog" />
          </a>
        }
        { !thumbnail &&
          <a href={ fbUrl } className="facebook">
            <Icon icon="facebook" />
          </a>
        }
      </nav>
    );
  }
}
