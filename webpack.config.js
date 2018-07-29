var path = require('path')
var webpack = require('webpack')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')
console.log(TARGET)

const extractTextPlugin = new ExtractTextPlugin({
    filename: 'main.css',
    disable: TARGET !== 'build',
})

module.exports = {
    entry: path.resolve(__dirname,'src/index'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                })
            }
        ]
    },
    plugins: [extractTextPlugin]
}

if(TARGET === 'build') {
    module.exports.plugins = [new UglifyJSPlugin(),...module.exports.plugins]
}
