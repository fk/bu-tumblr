"use strict";

var gulp = require("gulp");
var mocha = require("gulp-spawn-mocha");
var plumber = require("gulp-plumber");

module.exports = {
  taskName: "mocha",
  dependencies: ["del"],
  task: function() {
    gulp.src("./tests/**/*Test.js", { read: false })
      .pipe(plumber())
      .pipe(mocha({
        compilers: "babel:babel/register"
      }));
  },

  watch: function() {
    this.task();
    gulp.watch(["./test/**/*Test.js", "./app/**/*.js"], this.task);
  }
};
