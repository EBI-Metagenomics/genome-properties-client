const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const kB = 1024;
const imageInlineSizeLimit = 10000;

const shouldUseSourceMap = true;

// common function to get style loaders

module.exports = function (env, options) {
  const isEnvProduction = options.mode === "production";
  const isEnvDevelopment = options.mode === "development";
  return {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",

    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: isEnvProduction
        ? "js/[name].[contenthash:8].js"
        : "js/bundle.js",
      chunkFilename: isEnvProduction
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      modules: [path.resolve(".", "src"), "node_modules"],
      alias: {
        "@visual-framework$": path.resolve("node_modules", "@visual-framework"),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: imageInlineSizeLimit,
            name: "media/[name].[hash:8].[ext]",
          },
        },
        {
          test: /\.css$/,
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
          sideEffects: true,
        },
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                name: path.join("fonts", "[name].[hash:base62:3].[ext]"),
                limit: 1 * kB,
                mimetype: "application/font-woff",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            // inject: true,
            template: "public/index.html",
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].chunk.css",
        }),
      new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 3000,
      publicPath: "http://localhost:3000/",
      hot: true,
    },
  };
};
