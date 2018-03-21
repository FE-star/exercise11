var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var customPlugins = [];

if (TARGET === 'build') {
  customPlugins.push(
    new ExtractTextPlugin("[name].css"),
    new UglifyJsPlugin()
  );
} else if (TARGET === 'dev') {
  customPlugins.push(
    new ExtractTextPlugin({disable: true})
  );
}

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: customPlugins
}