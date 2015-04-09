function noop() {}
const STATIC_METHODS = Object.getOwnPropertyNames(noop);
function getStaticMethods(fn) {
  return Object.getOwnPropertyNames(fn)
    .filter(p => STATIC_METHODS.indexOf(p) === -1 && toString.call(fn[p]) === "[object Function]");
}

export default (target, source) => {
  let methodsToAttach = getStaticMethods(source);

  for (let fn of methodsToAttach) {
    target[fn] = source[fn].bind(target);
  }

  return target;
};
