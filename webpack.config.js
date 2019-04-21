var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var uglifyjs = require('uglifyjs-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的   dev/build
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var plugins = [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
        filename:'main.css',
        disable:TARGET == 'dev'
    }),
    // new uglifyjs()
];
var use = ['style-loader','css-loader'];

if(TARGET == 'build'){
    plugins.push(new uglifyjs());
    use = ExtractTextPlugin.extract({
        fallback:'style-loader',
        use:'css-loader'
    })

}

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        // filename:TARGET+'.js',
        path:path.resolve(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:use,
            }
        ]
    },
    plugins:plugins
}