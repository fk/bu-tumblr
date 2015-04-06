"use strict";

import React from "react/addons";
import AuthorActionCreators from "../../actions/AuthorActionCreators";
import AuthorStore from "../../stores/AuthorStore";
import RouterStore from "../../stores/RouterStore";
import storeComponent from "../../utils/storeComponent";

class BioRoute extends React.Component {
  static async fetchData({ params }) {
    let { authorName } = params;

    return AuthorActionCreators.getAuthor(authorName);
  }

  render() {
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

  return { author, loading };
};

export default storeComponent(BioRoute, [AuthorStore, RouterStore], getState);
