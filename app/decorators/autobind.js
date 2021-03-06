"use strict";

require("babel/polyfill");

const autobind = (target, key, descriptor) => {
  let { name: componentName } = target.constructor;
  let { value: fn } = descriptor;
  let fnId = Symbol(`autobound ${componentName}.prototype.${key}(...)`);
  let bound = false;

  delete descriptor.value;
  delete descriptor.writable;

  descriptor.set = function() {};
  descriptor.get = function() {
    return this[fnId] = fn.bind(this);
  };

  return descriptor;
};

export default autobind;
