var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.join(__dirname, "/src");

module.exports = {
  entry: path.resolve(APP_PATH, "./index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  mode: TARGET === "start" ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // replace ExtractTextPlugin
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
