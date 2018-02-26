var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var plugins = [];
var filename = '';
var cssRule = { loader: 'css-loader'};

if (TARGET === 'build') {
  var config = [
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.UglifyJsPlugin()
  ];
  plugins = plugins.concat(config);
  filename = 'main.min.js';
  cssRule = ExtractTextPlugin.extract([{
    loader: 'css-loader',
    options: {
      minimize: true,
    }
  }]);
} else {
  filename = "main.dev.js";
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssRule
      }
    ]
  },
  plugins: plugins
}
