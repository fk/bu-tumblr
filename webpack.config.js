"use strict";

var webpack = require("webpack");
var path = require("path");
var assign = require("object-assign");

var base = {
  entry: {
    bundle: "./app/index.js"
  },
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
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel?stage=0", exclude: /node_modules/ },
      { test: /\.json$/, loader: "json" }
    ]
  }
};

exports.build = base;

exports.server = assign({}, base, {
  devtool: "#eval-source-map",
  entry: [
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel?stage=0"],
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: "json",
        exclude: /node_modules/
      }
    ]
  }
});
