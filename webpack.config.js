var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var isBuild = TARGET === 'build' ? true : false

console.log(isBuild, '????isBuild')
const cssLoader = isBuild
    ?
    ExtractTextPlugin.extract({
        use: ['css-loader'],
        fallback: 'style-loader',
    })
    :
    ['style-loader', 'css-loader']

const plugins = isBuild
    ?
    [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: true,
            },
        }),
    ]
    :
    []

module.exports = {
    entry: path.join(APP_PATH, './index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader
            }
        ]
    },
    plugins
}

