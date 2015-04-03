"use strict";

import React from "react";
import autobind from "./autobind";
import purerender from "./purerender";

@purerender
export default function subscribeTo(...stores) {
  let getStateFromStores = stores.pop();

  return function decorator(Component) {
    return class SubscriptionComponent extends React.Component {
      state = getStateFromStores()

      componentDidMount() {
        stores.forEach(store => store.listen(this.handleChange));
      }

      componentWillUnmount() {
        stores.forEach(store => store.unlisten(this.handleChange));
      }

      @autobind
      handleChange() {
        this.setState(getStateFromStores(this.props));
      }

      render() {
        return (
          <Component />
        );
      }
    };
  };
};
