const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const extractCSS = new ExtractTextPlugin({
  filename: "style.css",
  disable: process.env.NODE_ENV === "development"
});

// 这个在 npm run dev 和 npm run build 时候是不同的
const TARGET = process.env.npm_lifecycle_event;
const APP_PATH = path.join(__dirname, "./src");
const BUILD_PATH = path.resolve(__dirname, "./dist");

module.exports = () => {
  let config = {
    entry: `${APP_PATH}/index.js`,
    output: {
      filename: "bundle.js",
      path: BUILD_PATH
    },
    devtool: TARGET === "start" ? "source-map" : "",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: extractCSS.extract({
            publicPath: "../",
            fallback: "style-loader",
            use: [{ loader: "css-loader", options: { sourceMap: true } }]
          })
        }
      ]
    },
    plugins: [extractCSS]
  };

  if (TARGET === "build") {
    config.plugins.push(new UglifyJsPlugin());
  }
  return config;
};
