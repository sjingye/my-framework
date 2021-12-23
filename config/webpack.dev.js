const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const proxySetting = require("../src/services/setProxy.ts");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3030,
    historyApiFallback: true,
    // 启用gzip
    compress: true,
    // 开启 HotModuleReplacementPlugin
    hot: true,
    proxy: { ...proxySetting },
  },
});
