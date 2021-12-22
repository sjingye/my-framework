const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3030,
    historyApiFallback: true
  //   {
  //     rewrites: [
  //         // shows favicon
  //         { from: /favicon.ico/, to: '[path/to/favicon]' }
  //     ]
  // }
  },
});
