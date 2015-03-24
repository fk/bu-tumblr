"use strict";

var gulp = require("gulp");
var eslint = require("gulp-eslint");

module.exports = {
  taskName: "eslint",
  task: function() {
    return gulp.src(["./app/**/*.js", "./api/**/*.js"])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }
};
