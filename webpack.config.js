var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var devConfig = {
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     openPage: 'webpack-dev-server',
    //     compress: true,
    //     hot: true       
    // },
      module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']               
            }
        ]
    } 
};

var buildConfig = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })               
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

var config = TARGET === 'dev' ? devConfig : buildConfig;

module.exports = merge({
    entry: path.join(APP_PATH, 'index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin()]
}, config);
