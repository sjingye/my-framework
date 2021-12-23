/**
 * webpack.dll.js
 */
const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "none",
  entry: {
    // 最终打包生成的[name] --> dllFile
    dllFile: ["react", "react-dom", "lodash"],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, "../dll"),
    library: "[name]_[fullhash]", // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery lodash映射
    new webpack.DllPlugin({
      name: "[name]_[fullhash]", // 映射库的暴露的内容名称
      path: resolve(__dirname, "../dll/manifest.json"), // 输出文件路径
    }),
  ],
};
