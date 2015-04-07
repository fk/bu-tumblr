"use strict";

import React from "react";
import autobind from "./autobind";
import PureRender from "./PureRender";

@PureRender
export default function StoreComponent(...stores) {
  return function decorator(Component) {
    let { getStateFromStores } = Component;
    delete Component.getStateFromStores;

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
          <Component
            { ...this.state }
            { ...this.props } />
        );
      }
    };
  };
};
