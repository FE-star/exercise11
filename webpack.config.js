var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, './src')

var plugins = TARGET == "build" 
  ? [
      new ExtractTextPlugin("main.css"),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      })
    ]
  : []

var cssParser = TARGET == "build"
  ? ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
  })
  : [
      { loader: 'style-loader' },
      { loader: 'css-loader' }
    ]


module.exports = {
  entry: `${ APP_PATH }/index.js`,
  output: {
    filename: "main.js",
    path:path.join(__dirname, "./dist")
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: cssParser
    }]
  },
  plugins
}