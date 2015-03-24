"use strict";

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var plumber = require("gulp-plumber");

module.exports = {
  taskName: "mocha",
  dependencies: ["del"],
  task: function() {
    require("babel/register")({ experimental: true });
    gulp.src("./tests/**/*Test.js", { read: false })
      .pipe(plumber())
      .pipe(mocha());
  },

  watch: function() {
    this.task();
    gulp.watch(["./test/**/*Test.js", "./app/**/*.js"], this.task);
  }
};
