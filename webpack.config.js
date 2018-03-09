var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')
var BUILD_PATH = path.join(__dirname, '/dist')
const extractCSS = new ExtractTextPlugin({
  filename: "main.css",
  disable: TARGET === "start"
});

const config = {
  entry: `${APP_PATH}/index.js`,
  output: {
    filename: 'main.js',
    path: BUILD_PATH,
  },
  devtool: TARGET === 'start' ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: extractCSS.extract({
          publicPath: "../",
          fallback: "style-loader",
          use: [{ loader: "css-loader", options: { sourceMap: true } }]
        })
      }
    ]
  },
  plugins: [extractCSS]
}
if (TARGET === 'build') {
  config.plugins.push(new UglifyJsPlugin())
}
module.exports = config