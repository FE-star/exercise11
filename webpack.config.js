var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const {UglifyJsPlugin} = webpack.optimize

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

const rules = []
const plugins = []

if (TARGET === 'production') {
  rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  })

  plugins.push(new ExtractTextPlugin('main.css'))
  plugins.push(new UglifyJsPlugin())
} else {
  rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  })
}

const config = {
  entry: APP_PATH,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules
  },
  plugins
}

module.exports = config