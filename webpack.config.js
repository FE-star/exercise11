var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var build = {
    entry: {
        main: APP_PATH
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

var dev = {
    entry: {
        main: APP_PATH
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
}

module.exports = TARGET === 'build' ? build : dev;