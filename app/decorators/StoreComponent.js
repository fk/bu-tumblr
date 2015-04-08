"use strict";

import React from "react";
import autobind from "./autobind";

export default function StoreComponent(...stores) {
  return function decorator(Target) {
    let { getStateFromStores, fetchData } = Target;
    delete Target.getStateFromStores;
    delete Target.fetchData;

    return class SubscriptionComponent extends React.Component {
      static async fetchData(params, query) {
        if (fetchData) {
          return fetchData.call(Target, params, query);
        }
      }

      constructor(props) {
        super(props);
        this.state = getStateFromStores(props)
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
    };
  };
};
