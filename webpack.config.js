var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')
module.exports = TARGET === 'dev' ? {
    entry: {
        app:  APP_PATH + '/index.js'
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules: [
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader"
              },
              exclude: /node_modules/
          },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"] 
            }
        ]
      }
} : {
    entry: {
      app:  './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }],
            })
          }
      ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new uglify()
    ]
}