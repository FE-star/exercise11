var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyPlugin = require('uglifyjs-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')
var isBuild = TARGET === 'build';

module.exports = function getConfig(){
    var config = {};

    config.entry = path.join(APP_PATH, 'index.js');

    config.output = {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    };

    config.module = {
        rules: [
            {
                test: /\.css$/,
                use: isBuild ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                }) : ['style-loader', 'css-loader']
            }
        ]
    }

    config.plugins = [];
    
    if (isBuild) {
        config.plugins.push(
            new UglifyPlugin(),
            new ExtractTextPlugin('main.css')
        )
    } else {
        config.plugins.push(new HtmlPlugin());
    }


    config.devServer = {
        contentBase: path.join(__dirname, '/dist'), // 本地服务器所加载的页面所在目录
        historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    }
    return config;
}();
