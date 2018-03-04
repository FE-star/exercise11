var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: TARGET + '.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: TARGET === 'build' ?
        ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }) : ['style-loader', 'css-loader'],
    }, ]
  },
  plugins: TARGET === 'build' ? [
    // 提取 css
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    // 压缩 js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ] : []
}
