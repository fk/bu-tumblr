"use strict";

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var gutil = require("gulp-util");
var config = require("../webpack.config");

module.exports = {
  taskName: "webpack",
  dependencies: ["del", "mocha"],
  task: function (callback) {
    webpack(config.build, function (err, stats) {
      if (err) {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("webpack", stats.toString({
        progress: true,
        colors: true
      }));

      callback();
    });
  },

  watch: function() {
    return new WebpackDevServer(webpack(config.server), {
      publicPath: config.server.output.publicPath,
      hot: true,
      inline: true,
      noInfo: true,
      inlineSourceMaps: true
    }).listen(9000, "localhost", function(err, result) {
      if (err) {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("webpack", "WebpackDevServer ready at http://localhost:9000");
    });
  }
}
