"use strict";

var gulp = require("gulp");
var gif = require("gulp-if");
var concat = require("gulp-concat");
var stylus = require("gulp-stylus");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var nib = require("nib");
var jeet = require("jeet");
var rupture = require("rupture");
var streamqueue = require("streamqueue");

module.exports = {
  taskName: "stylus",
  dependencies: ["del"],
  task: function () {
    var stream = streamqueue({ objectMode: true });
    var normalize = gulp.src("./node_modules/normalize.css/normalize.css");
    var fonts = gulp.src("./node_modules/font-awesome/css/font-awesome.css");
    var styles = gulp.src("./app/stylus/index.styl")
      .pipe(stylus({
        use: [nib(), jeet(), rupture()]
      }));
    var components = gulp.src("./app/components/**/*.styl")
      .pipe(stylus({
        use: [nib(), jeet(), rupture()]
      }));


    stream.pipe(sourcemaps.init({ loadMaps: true }));
    stream.queue(normalize);
    stream.queue(fonts);
    stream.queue(styles);
    stream.queue(components);

    return stream.done()
      .pipe(concat("app.css"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./public/stylesheets"));
  },

  watch: function() {
    this.task();
    gulp.watch(["./app/**/*.styl"], this.task);
  }
};
