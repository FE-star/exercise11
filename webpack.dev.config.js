var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

module.exports = {
  entry: APP_PATH, // 入口
  output: { // 输出地点
    path: path.resolve(__dirname, 'dev'),
    filename: 'main.js'
  },
  // devServer: { // dev server 配置(开发服务器配置)
  //   contentBase: path.resolve(__dirname, 'dist'), // 默认情况下，webpack-dev-server会从项目的根目录提供文件，可以通过此选项设置文件的目录名
  //   port: 8078,
  //   inline: true, // 设为true时可以在文件发生变化时，更新页面
  //   colors: true, // 设置终端输出字体颜色
  //   historyApiFallback: true, // 当设置为true时，访问所有服务器上不存在的文件，都会被重定向到/，也就是index.html文件
  // },
  module: { // 规则: 文件对应的规则
    rules: [{
      test: /\.css/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [ // 注册使用的插件
  ]
}