/**
 * webpack config文件的相对位置 是参照于 项目目录的
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const TerserPlugin = require("terser-webpack-plugin");
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  // stats：当设为 error-only 时，终端中只会打印错误日志，这个配置个人觉得很有用，
  // 现在开发中经常会被一堆的 warn 日志占满，比如一些 eslint 的提醒规则，编译信息等，头疼的很
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，
              // 所以我们开启 cacheDirectory 将这些公共文件缓存起来，下次编译就会加快很多
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 'style-loader': 将 JS 字符串生成为 style 节点
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    //If multiple files share the same name but have different extensions,
    //  webpack will resolve the one with the extension listed first in the array and skip the rest.
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      '@': path.resolve(__dirname, "../src")
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template (lodash by default)
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      /* 
      特别注意⚠️：
      在讲基础配置配置 html-webpack-plugin 时，注释中特别强调过要配置 cache: false ，
      如果不加的话，你代码修改之后刷新页面，html 文件不会引入任何打包出来的 js 文件，
      自然也没有执行任何 js 代码，特别可怕，我搞了好久，查了 copy-webpack-plugin 官方 issue 才找到的解决方案。
      */
      cache: false
    }),
    new MiniCssExtractPlugin(),
    new WebpackBar({
      name: isDevelopment ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    // new HardSourceWebpackPlugin(),
    // 上面我们配置 terser 时说过，打包时会把代码中所有注释去除，除了一些有特殊标记的比如 @preserve 这种就会保留。
    // 我们希望别人在使用我们开发的包时，可以看到我们自己写好的声明注释（比如 react 就有），
    // 就可以使用 webpack 内置的 BannerPlugin ，无需安装！
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-ts-quick-starter (https://github.com/vortesnail/react-ts-quick-starter) */',
    }),
  ],
  optimization: {
    // 首先增加了 minimize ，它可以指定压缩器，如果我们设为 true ，就默认使用 terser-webpack-plugin ，设为 false 即不压缩代码。
    // 接下来在 minimize 中判断如果是生产环境，就开启压缩。
    // extractComments 设为 false 意味着去除所有注释，除了有特殊标记的注释，比如 @preserve 标记，后面我们会利另一个插件来生成我们的自定义注释。
    // pure_funcs 可以设置我们想要去除的函数，比如我就将代码中所有 console.log 去除。
    minimize: !isDevelopment,
    minimizer: [
      !isDevelopment && new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
            ],
          },
        },
      }),
      
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // 不再打包到dist文件夹中，比如可以通过cdn方式引入固定版本，同时从package.json中删除
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
