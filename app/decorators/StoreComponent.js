"use strict";

import React from "react";
import autobind from "./autobind";
import copyStaticMethods from "../utils/copyStaticMethods";

export default function storeComponent(...stores) {
  return function decorator(Target) {
    let { getStateFromStores, fetchData } = Target;

    class SubscriptionComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = getStateFromStores(props);
        this.handleChange = this.handleChange.bind(this);
      }

      componentDidMount() {
        stores.forEach(store => store.listen(this.handleChange));
      }

      componentWillUnmount() {
        stores.forEach(store => store.unlisten(this.handleChange));
      }


      handleChange() {
        this.setState(getStateFromStores(this.props));
      }

      render() {
        return (
          <Target
            { ...this.props }
            { ...this.state } />
        );
      }
    }

    return copyStaticMethods(SubscriptionComponent, Target);
  };
}
