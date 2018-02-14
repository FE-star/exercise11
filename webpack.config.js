var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')
console.log(TARGET)
const config = {
    entry: APP_PATH+'/index.js',
    output:{
        filename:'testbundle.js',
        path: path.join(__dirname, '/test')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader'
                    ]
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin("style.css")
    ]
}

if(TARGET=='dev'){
    console.log('dev')
    config.module.rules=[
        {
                test: /\.css$/,
                use:['style-loader','css-loader']
        }
    ]
}
module.exports = config