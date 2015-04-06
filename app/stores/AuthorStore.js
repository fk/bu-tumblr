"use strict";

import alt from "../alt";
import sanitize from "../utils/sanitize";
import AuthorActionCreators from "../actions/AuthorActionCreators";
import { OrderedMap, fromJS, Iterable } from "immutable";

class AuthorStore {
  constructor() {
    this.bindActions(AuthorActionCreators);

    this.loading = false;
    this.authors = new OrderedMap();

    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.authors)) {
      this.authors = fromJS(this.authors, (key, value) => {
        let isIndexed = Iterable.isIndexed(value);

        return isIndexed ? value.toList() : value.toOrderedMap();
      });
    }
  }

  static getByName(name) {
    let { authors } = this.getState();

    return authors.find(author => author.get("name") === name);
  }

  onGetAuthor() {
    this.loading = true;
  }

  onGetAuthorSuccess(resp) {
    let { authors } = resp.entities;

    authors = sanitize(authors);

    console.log(authors);

    this.loading = false;
    this.authors = this.authors.merge(authors);
  }

  onGetAuthorError(err) {
    this.loading = false;
  }
}

export default alt.createStore(AuthorStore, "AuthorStore");
