var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var commonOption = {
    entry: APP_PATH + '/index.js',
    output: {
        filename: 'main.js',
        // path: __dirname + '/dist'
        path: path.join(__dirname, '/dist')
    }
}

module.exports = TARGET === 'dev' ? Object.assign({}, commonOption, {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
}) : Object.assign({}, commonOption, {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});