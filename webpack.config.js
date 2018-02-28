var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var devConfig ={
    entry:path.join(APP_PATH,'/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[]
};
var buildConfig ={
    entry:path.join(APP_PATH,'/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('main.css')
    ]
};
var isDev = TARGET === 'dev';
if(isDev){
    module.exports=devConfig;
}else{
    module.exports=buildConfig;
}

module.exports = config;