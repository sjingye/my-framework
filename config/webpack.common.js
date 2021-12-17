/**
 * webpack config文件的相对位置 是参照于 项目目录的
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        // 必须用绝对位置
        // include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        loader: require.resolve("file-loader"),
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  resolve: {
    //If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  plugins: [
    new HtmlWebpackPlugin({
      title: "my framework",
      // Load a custom template (lodash by default)
      template: "./index.html",
    }),
  ],
};
