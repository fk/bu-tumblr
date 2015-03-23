"use strict";

import React from "react";

export default function(Component, stores, getState) {
  return class StoreWrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = getState();
      this.onChange = this.onChange.bind(this);
    }

    static async fetchData(props) {
      try {
        return Component.fetchData(props);
      }
      catch (err) {
        Promise.reject(err);
      }
    }

    componentDidMount() {
      stores.forEach(store => store.listen(this.onChange));
    }

    componentWillUnmount() {
      stores.forEach(store => store.unlisten(this.onChange));
    }

    onChange() {
      this.setState(getState(this.props));
    }

    render() {
      return (
        <Component
          { ...this.props }
          { ...this.state } />
      );
    }
  };
};
