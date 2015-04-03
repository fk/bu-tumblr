"use strict";

export const getViewport = () => {
  let y = window.pageYOffset !== undefined ?
    window.pageYOffset :
    (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop;

  let x = window.pageXOffset !== undefined ?
    window.pageYOffset :
    (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollLeft;

    var w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    var h = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    return { x, y, w, h };
};

export const getInViewport = (node) => {
  let rect = node.getBoundingClientRect();
  let windowHeight = window.innerHeight ||
    document.documentElement.clientHeight;
  let windowWidth = window.innerWidth ||
    document.documentElement.clientWidth

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= windowHeight &&
    rect.left <= windowWidth
  );
};
