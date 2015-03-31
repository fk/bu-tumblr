"use strict";

import React, { PropTypes } from "react/addons";
import warning from "react/lib/warning";
import PostStore from "../stores/PostStore";
import RouterStore from "../stores/RouterStore";
import storeComponent from "../utils/storeComponent";

const { PureRenderMixin } = React.addons;

class PostRoute extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);
  }

  render() {
    let { router } = this.props;

    return (
      <div className="post-route">

      </div>
    );
  }
};

const getState = () => {
  let { router } = RouterStore.getState();
  let postId = router.getIn(["params", "postId"]);
  let post = PostStore.getById(postId);

  return { router };
};

export default storeComponent(PostRoute, [PostStore, RouterStore], getState);
