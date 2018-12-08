var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event;
var APP_PATH = path.join(__dirname, '/src');
var myModule = {
    entry: path.join(APP_PATH, '/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist')
    }
}
var devModele = {
    module: {
        rules: [{
            test: /\.css/,
            loaders: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    devServer: {
        
    }
};
var buildModel = {
    module: {
        rules: [{
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
};
TARGET === "build" ? Object.assign(myModule, buildModel) : Object.assign(myModule, devModele);
module.exports = myModule;