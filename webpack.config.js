var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src');


const webpackConfig = {
    entry: path.join(APP_PATH, '/index.js'),
    output: {
        path: path.join(APP_PATH, '../dist_exercise'),
        filename: 'main.js'
    },
    devtool: TARGET === 'start' ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles_exercise11.css')
    ]
}

const buildConfig = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new UglifyJsPlugin()
    ]
}

module.exports = (TARGET === 'build') ? Object.assign(webpackConfig, buildConfig) : webpackConfig;