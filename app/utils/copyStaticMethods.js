if (!Object.getOwnPropertyNames) {
  Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
    if (object !== Object(object)) {
      throw new TypeError("Object.getOwnPropertyNames called on non-object");
    }

    let buffer = [], key;

    for (let key in object) {
      buffer.push(key);
    }

    return buffer;
  };
}

function noop() {}
const STATIC_METHODS = Object.getOwnPropertyNames(noop);
function getStaticMethods(fn) {
  return Object.getOwnPropertyNames(fn)
    .filter(p => (STATIC_METHODS.indexOf(p) === -1)
      && (toString.call(fn[p]) === "[object Function]"));
}

export default (target, source) => {
  let methodsToAttach = getStaticMethods(source);

  for (let fn of methodsToAttach) {
    target[fn] = source[fn].bind(target);
  }

  return target;
};
