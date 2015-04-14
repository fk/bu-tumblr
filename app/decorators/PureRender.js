"use strict";

import { addons } from "react/addons";
const { PureRenderMixin } = addons;

export default function (target) {
  let { shouldComponentUpdate } = target;
  target.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    let pureUpdate = PureRenderMixin.shouldComponentUpdate
      .call(this, nextProps, nextState);

    return shouldComponentUpdate ?
      (shouldComponentUpdate.call(this, nextProps, nextState) || pureUpdate) :
      pureUpdate;
  };
};
