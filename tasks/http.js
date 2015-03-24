"use strict";

var gulp = require("gulp");
var path = require("path");
var spawn = require("child_process").spawn;

var livereload = require("tiny-lr")();
var server = path.join(__dirname, "../app/server.js");

module.exports = {
  taskName: "http",
  watch: function() {
    livereload.listen(35729);

    gulp.watch(["./public/**/*"], function(event) {
      var fileName = path.relative(__dirname, event.path);
      livereload.changed({body: { files: [fileName] }});
    });

    process.env.PATH = path.join(
      __dirname, "../node_modules/.bin"
    ) + ":" + process.env.PATH;

    spawn("supervisor", ["--harmony", "--ignore ./public", "-e js", server], {
      stdio: "inherit",
      env: process.env
    });
  }
};
