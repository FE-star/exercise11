var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
// dev: dev; prod: build; dev-server: start
var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.join(__dirname, '/src');

// 插件项
var plugins = [];
if (TARGET === 'dev' || TARGET === 'start') {
  // ...
} else if (TARGET === 'build') {
  plugins.push(
    // 压缩 js 代码
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        // 排除关键字
        except: ['$super', '$', 'exports', 'require', 'module', '_']
      }
    }),
    // css 代码单独打包
    new ExtractTextPlugin('main.css')
  );
}

module.exports = {
  entry: path.join(APP_PATH, 'index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: TARGET === 'dev' ? 'main.dev.js' : 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: TARGET === 'dev' || TARGET === 'start'
        ? {
            loader: 'css-loader'
          }
        : ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                minimize: true, // css 压缩
              }
            }
          ])
      }
    ]
  },
  plugins: plugins
};
