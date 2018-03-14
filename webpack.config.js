var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var common = {
    context: APP_PATH,
    entry: path.join(APP_PATH, 'index.js'),//入口是针对当前webpack.config.js同级目录下的文件进行打包
    output: {
        path: path.join(__dirname, 'dist1'),
        filename: 'index.js'
    }
}

if (TARGET == 'dev') {
    module.exports = Object.assign({}, common, {
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: APP_PATH //指定src下的css文件进行编译 ,那这里指定了~上面的entry入口后面的'./'不就没意义了?
            }]
        }
    })
} else if (TARGET === 'build') {
    module.exports = Object.assign({}, common, {
        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: APP_PATH
            }]
        },
        plugins: [
            new ExtractTextPlugin('index.css', {
                allChunks: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}