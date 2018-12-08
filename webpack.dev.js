const webpack = require("webpack")
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: "source-map", // 开启调试
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    hot: true,
    overlay: true, 
  },
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [
          {
            loader: 'style-loader/url'
          },
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})
