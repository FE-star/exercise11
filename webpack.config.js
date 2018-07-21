var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

module.exports = {
  entry: APP_PATH, // 入口
  output: { // 输出地点
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: { // 规则: 文件对应的规则
    rules: [{
      test: /\.css/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }]
  },
  plugins: [ // 注册使用的插件
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }), // 提取css到一个独立的样式文件的插件
    new webpack.optimize.UglifyJsPlugin(), // 代码压缩插件, webpack自带
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ]
}