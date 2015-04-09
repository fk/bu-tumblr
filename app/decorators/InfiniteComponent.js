import React from "react";
import assign from "object-assign";
import { OrderedMap } from "immutable";
import copyStaticMethods from "../utils/copyStaticMethods";
import { getViewport } from "../utils/viewport";

let viewport = new OrderedMap({ x: 0, y: 0, w: 0, h: 0 });

export default function decorator(Target) {
  const { onInfiniteScroll } = Target;
  delete Target.onInfiniteScroll;

  class InfiniteComponent extends React.Component {
    state = {
      request: false,
      page: 0,
      itemsPerPage: 20
    }

    frame = null

    constructor(props) {
      super(props);
      this.checkScroll = this.checkScroll.bind(this);
    }

    componentDidMount() {
      viewport = viewport.merge(getViewport());
      this.checkScroll();
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.frame);
    }

    checkScroll(event) {
      let { request, page, itemsPerPage } = this.state;
      let { clientHeight } = document.body;

      viewport = viewport.merge(getViewport());

      const THRESHOLD = clientHeight - (viewport.get("h") / 2);
      const SCROLLED = viewport.get("y") + viewport.get("h");
      const LOAD_MORE = SCROLLED > THRESHOLD;
      const CLEAR_LOAD_ACTION = () => this.setState({ request: false });

      if (LOAD_MORE && !request) {
        page += 1;

        request = onInfiniteScroll({ page, itemsPerPage })
          .then(CLEAR_LOAD_ACTION)
          .catch(CLEAR_LOAD_ACTION);

        this.setState({ page, request });
      }

      this.frame = requestAnimationFrame(this.checkScroll);
    }

    render() {
      return (
        <Target
          { ...this.props }
          { ...this.state } />
      );
    }
  }

  return copyStaticMethods(InfiniteComponent, Target);
}
