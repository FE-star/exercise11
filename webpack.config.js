var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var webpackBase = {
    mode: TARGET === 'build' ?  'production' :'development',
    entry: path.resolve(APP_PATH, 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    }
}
var webpackStart = {
    module: { 
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }
};
var webpackbuild= {
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};

module.exports = Object.assign(webpackBase, TARGET === 'build' ? webpackbuild : webpackStart);
