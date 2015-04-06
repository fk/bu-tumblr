"use strict";

import React from "react/addons";
import AuthorActionCreators from "../../actions/AuthorActionCreators";
import AuthorStore from "../../stores/AuthorStore";
import PostStore from "../../stores/PostStore";
import RouterStore from "../../stores/RouterStore";
import storeComponent from "../../utils/storeComponent";

class BioRoute extends React.Component {
  static async fetchData({ params }) {
    let { authorName } = params;

    return AuthorActionCreators.getAuthor(authorName);
  }

  render() {
    let { author, posts, loading } = this.props;

    console.log(author);

    return (
      <div className="bio-route">

      </div>
    );
  }
}

const getState = (props) => {
  let { router } = RouterStore.getState();
  let { loading } = AuthorStore.getState();

  let authorName = router.getIn(["params", "authorName"]);
  let author = AuthorStore.getByName(authorName);
  let posts = PostStore.getPostsByAuthor(authorName);

  return { author, loading, posts };
};

export default storeComponent(
  BioRoute,
  [AuthorStore, RouterStore, PostStore],
  getState
);
