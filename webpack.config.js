var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

const baseConfig = {
    entry: path.join(APP_PATH, '/index.js'),
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [{
                loader: 'css-loader'
            }]
        }]
    }
}
const productionConfig = {
    module: {
        rules: [{
            test: /\.css/,
            use:  ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
}

module.exports = TARGET === 'build' ? {...baseConfig, ...productionConfig} : baseConfig;