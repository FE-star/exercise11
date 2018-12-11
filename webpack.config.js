var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var common = {
    entry: path.join(APP_PATH, '/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }

}
var dev = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
})
var build = merge(common, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
})

module.exports = TARGET === 'start' ? dev : build;
