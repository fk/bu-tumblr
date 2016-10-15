"use strict";

var gulp = require("gulp");
var gif = require("gulp-if");
var watch = require('gulp-watch');
var concat = require("gulp-concat");
var gutil = require("gulp-util");
var cleanCSS = require("gulp-clean-css");
var stylus = require("gulp-stylus");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var jeet = require("jeet");
var rupture = require("rupture");
var streamqueue = require("streamqueue");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var flexbugsFixes = require("postcss-flexbugs-fixes");

var production = process.env.NODE_ENV === "production";

var postcssProcessors = [
  flexbugsFixes(),
  autoprefixer({
    "browsers": [
      "Chrome >= 35",
      "Firefox >= 38",
      "Edge >= 12",
      "Explorer >= 9",
      "iOS >= 8",
      "Safari >= 8",
      "Android 2.3",
      "Android >= 4",
      "Opera >= 12"
    ]
  })
]

module.exports = {
  taskName: "stylus",
  dependencies: ["del"],
  task: function () {
    var stream = streamqueue({ objectMode: true });
    var normalize = gulp.src("./node_modules/normalize.css/normalize.css");
    var fonts = gulp.src("./node_modules/font-awesome/css/font-awesome.css");
    var styles = gulp.src("./app/stylus/index.styl")
      .pipe(stylus({
        use: [jeet(), rupture()]
      }));
    var components = gulp.src("./app/components/**/*.styl")
      .pipe(stylus({
        use: [jeet(), rupture()]
      }));

    stream.pipe(gif(
      !production,
      sourcemaps.init({ loadMaps: true }),
      gutil.noop()
    ));
    stream.queue(normalize);
    stream.queue(fonts);
    stream.queue(styles);
    stream.queue(components);

    return stream.done()
      .pipe(concat(gif(production, "app.min.css", "app.css")))
      .pipe(postcss(postcssProcessors))
      .pipe(gif(production, cleanCSS({debug: true}, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
      }), gutil.noop()))
      .pipe(gif(
        !production,
        sourcemaps.write(),
        gutil.noop()
      ))
      .pipe(gulp.dest("./public/stylesheets"));
  },

  watch: function() {
    this.task();
    watch(["./app/**/*.styl"], this.task);
  }
};
