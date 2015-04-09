"use strict";

export const getViewport = () => {
  let doc = (
    document.documentElement ||
    document.body.parentNode ||
    document.body
  );

  let x = window.pageXOffset !== undefined ?
    window.pageXOffset : doc.scrollLeft;

  let y = window.pageYOffset !== undefined ?
    window.pageYOffset : doc.scrollTop;

  let w = window.innerWidth || doc.clientWidth;

  let h = window.innerHeight || doc.clientHeight;

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
