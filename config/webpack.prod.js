const { merge } = require("webpack-merge");
const path = require("path");
const glob = require('glob')
// 去除没有用到的css
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    // 大家要注意⚠️：一定也要把引入样式的 tsx 文件的路径也给到，不然无法解析你没有哪个样式类名，自然也无法正确剔除无用样式了。
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, { nodir: true }),
    }),
  ],
});
