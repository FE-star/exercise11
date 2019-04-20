var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var ENV = TARGET === 'build' ? 'production' : 'development'
var APP_PATH = path.join(__dirname, 'src')
var OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
    mode: ENV,
    entry: path.join(APP_PATH, '/index.js'),
    output: {
        path: OUTPUT_PATH,
        filename: 'main.js'
    },
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
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            filename: "main.css",
            disable: ENV !== 'production'
        }),
    ]
};