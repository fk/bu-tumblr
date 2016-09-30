"use strict";

var webpack = require("webpack");
var path = require("path");
var assign = require("object-assign");

function noop() {}

var progressEvent = function(percentage, message) {
  var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
  var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();

  process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "%, " +
    message + MOVE_LEFT);
};

var base = {
  entry: [
    "babel-polyfill",
    "./app/index.js"
  ],
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "public")
  },
  devtool: false,
  cache: true,
  context: __dirname,
  resolve: {
    extensions: ["", ".js", ".jsx", ".es6"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production"),
        "BROWSER": JSON.stringify(true)
      }
    }),
    new webpack.ProgressPlugin(progressEvent),
    // @see https://github.com/moment/moment/issues/2416#issuecomment-111713308
    // @see https://github.com/webpack/webpack/issues/198
    // @see http://stackoverflow.com/questions/38288018/why-is-my-webpack-bundle-so-large
    // @see https://github.com/moment/moment/issues/2373#issuecomment-233293900
    // @see https://github.com/moment/moment/issues/1435#issuecomment-187100876
    // @see https://github.com/moment/moment/issues/2517
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    (process.env.NODE_ENV === "production" ?
      new webpack.optimize.UglifyJsPlugin({ comments: false }) : noop)
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader!eslint-loader", exclude: /node_modules/ },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.styl$/, loader: "style!css!stylus" },
      { test: /\.json$/, loader: "json" }
    ]
  }
};

exports.build = base;

exports.server = assign({}, base, {
  devtool: "#eval-source-map",
  entry: [
    "babel-polyfill",
    "webpack-dev-server/client?http://localhost:9000/",
    "webpack/hot/only-dev-server",
    "./app/index.js"
  ],
  output: assign({}, base.output, {
    filename: "bundle.js",
    publicPath: "http://localhost:9000/dist/"
  }),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(progressEvent),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development"),
        "BROWSER": JSON.stringify(true)
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "react-hot!babel-loader!eslint-loader", exclude: /node_modules/ },
      { test: /\.json$/, loader: "json", exclude: /node_modules/ },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.styl$/, loader: "style!css!stylus" }
    ]
  }
});
