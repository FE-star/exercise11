var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.join(__dirname, '/src');
var webpackConfig = {
  entry: APP_PATH,
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: TARGET === 'start' ? [
          'style-loader',
          'css-loader'
        ] : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: []
}
if (TARGET === 'build') webpackConfig.plugins.push(new ExtractTextPlugin("styles.css"));
module.exports = webpackConfig;