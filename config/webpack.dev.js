const webpack = require('webpack')
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const proxySetting = require("../src/services/setProxy");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3030,
    historyApiFallback: true,
    proxy: { ...proxySetting }
  //   {
  //     rewrites: [
  //         // shows favicon
  //         { from: /favicon.ico/, to: '[path/to/favicon]' }
  //     ]
  // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
