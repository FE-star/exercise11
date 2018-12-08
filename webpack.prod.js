const merge = require("webpack-merge")
const common = require('./webpack.common.js')

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: {
              loader: "style-loader",
              options: {
                singleton: true
              }
            },
            use: [
              {
                loader: "css-loader",
                options: {
                  minimize: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new ExtractTextPlugin({
        filename: "main.css",
        allChunks: false
      }),
      new UglifyJSPlugin(),
    ]
  })