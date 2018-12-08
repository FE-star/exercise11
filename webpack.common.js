const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
      app: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js"
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: "html-loader"
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
        filename: "index.html",
        // template: "./index.html",
        chunks: ["app"],
        minify: {
          collapseWhitespace: true
        }
      }
      ),
    ]
  };