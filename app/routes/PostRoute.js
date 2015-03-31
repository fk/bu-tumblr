"use strict";

import React, { PropTypes } from "react/addons";
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
    return (
      <div className="post-route">

      </div>
    );
  }
};

const getState = props => {
  let { router } = RouterStore.getState();
  // let { postId } = router.get("params");
  // let post = PostStore.getById(postId);

  // return { post };
};

export default storeComponent(PostRoute, [PostStore, RouterStore], getState);
